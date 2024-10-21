"use server"
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import {  sendEmailverification } from "@/lib/mail";
export const createAccount = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values);

  if (!validatedField.success) return { error: "Invalid credential!" };

  const { email, password, username } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  console.log(existingUser)

  if (existingUser) return { error: "Email already in use!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: { email: email, name: username, password:hashedPassword },
  });

  const verificationToken=await generateVerificationToken(email)

  await sendEmailverification(verificationToken.token,verificationToken.email)

  return { success: "Confirmation email sent!" };
};
