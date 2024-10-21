"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { login_redirect_route } from "@/routes";
import { AuthError } from "next-auth";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (!hasExpired) return { error: "Token has Expired" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  try {
    await signIn("credentials", {
      email: existingUser.email,
      password: existingUser.password,
      redirectTo: login_redirect_route,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credential!" };
        default:
          return { error: "Somthing went wrong!" };
      }
    }
    throw error;
  }
  return { success: "Redirecting to Home" };
};
