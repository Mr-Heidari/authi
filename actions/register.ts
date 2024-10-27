"use server";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendEmailverification } from "@/lib/mail";
import { emailVerificator } from "@/lib/hunter/hunter";
export const createAccount = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values);

  if (!validatedField.success) return { error: "Invalid credential!" };

  const { email, password, username } = validatedField.data;

  try {
    const emailIsValid = await emailVerificator(email);

    if (!emailIsValid) throw Error;
    if (
      emailIsValid.data.status !== "valid" &&
      emailIsValid.data.result !== "deliverable"
    )
      return { error: "Use valid email address" };
    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error: "Email already in use!" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: { email: email, name: username, password: hashedPassword },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendEmailverification(
      verificationToken.token,
      verificationToken.email
    );

    return { success: "Confirmation email sent!" };
  } catch {
    return { error: "Check you network connection" };
  }
};
