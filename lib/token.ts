import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getResetPasswordTokenByEmail } from "@/data/passwordResetToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getDate() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getDate() + 3600 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const resetPasswordToken = await db.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return resetPasswordToken;
};
