import { db } from "@/lib/db";

export const getResetPasswordTokenByToken = async (token: string) => {
    try {
      const ResetToken = await db.passwordResetToken.findFirst({
        where: {
          token,
        },
      });
      return ResetToken;
    } catch {
      return null;
    }
  };

  export const getResetPasswordTokenByEmail = async (email: string) => {
    try {
      const ResetToken = await db.passwordResetToken.findFirst({
        where: {
          email,
        },
      });
      return ResetToken;
    } catch {
      return null;
    }
  };