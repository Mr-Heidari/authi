"use server"
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/token";
import { ResetPasswordSchema } from "@/schema/schema";
import { z } from "zod";

export const resetPasswordRequest = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedField = ResetPasswordSchema.safeParse(values);

  if (!validatedField.success) return { error: "Invalid credentials!" };

  const { email } = validatedField.data;

  const existingUser=await getUserByEmail(email)

  if(!existingUser) return {error:'Email does not exist'}

  const resetToken= await generateResetPasswordToken(email)

  await sendResetPasswordEmail(resetToken.token,resetToken.email)

  return {success:'Reset request sent!'}
};
