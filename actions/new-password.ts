"use server";
import { getResetPasswordTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schema/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
export const confirmNewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) return { error: "Missing token!" };

  const validatedField = NewPasswordSchema.safeParse(values);

  if (!validatedField.success) return { error: "Invalid Credentials" };

  const { password } = validatedField.data;

  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) return { error: "Invalid token!" };

  const hasExpired =
    new Date(existingToken.expires) < new Date(new Date().getDate());

  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated!"};
};
