"use server"
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { login_redirect_route } from "@/routes";
import { LoginSchema } from "@/schema/schema";
import { AuthError } from "next-auth";

import { z } from "zod";

export const loginAccount = async (values: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(values);

  if (!validatedField.success) return { error: "Invalid Credential!assas" };

  const { email, password } = validatedField.data;

  const existingUser = await getUserByEmail(email);
  console.log("asassas")

  if (!existingUser || !existingUser.password || !existingUser.email)
    return { error: "Email does not exist!" };

  try {
    await signIn("credentials", {
      email,
      password,
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
};
