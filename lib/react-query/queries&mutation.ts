import { signIn } from "next-auth/react";
import { login_redirect_route } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/actions/register";
import {
  LoginSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "@/schema/schema";
import { z } from "zod";
import toast from "react-hot-toast";
import { loginAccount } from "@/actions/login";
import { resetPasswordRequest } from "@/actions/resetpassword";
import { confirmNewPassword } from "@/actions/new-password";

export const useOAuthSignIn = () => {
  return useMutation({
    mutationFn: async (providers: "google" | "github") => {
      try {
        await signIn(providers, {
          callbackUrl: login_redirect_route,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof RegisterSchema>) =>
      await createAccount(values).then((message) => {
        if (message.error) {
          toast.error(message.error);
          return message.error;
        }
        if (message.success) {
          toast.success(message.success);
          return message.success;
        }
      }),
  });
};

export const useLodingAccount = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) =>
      await loginAccount(values).then((message) => {
        if (message?.error) {
          toast.error(message.error);
          return message.error;
        }
        if (message?.success) {
          toast.success(message.success);
          return message.success;
        }
      }),
  });
};

export const useResetPasswordRequest = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof ResetPasswordSchema>) =>
      await resetPasswordRequest(values).then((message) => {
        if (message?.error) {
          toast.error(message.error);
          return message.error;
        }
        if (message?.success) {
          toast.success(message.success);
          return message.success;
        }
      }),
  });
};

export const useConfirmNewPassword = () => {
  return useMutation({
    mutationFn: async ({
      values,
      token,
    }: {
      values: z.infer<typeof NewPasswordSchema>;
      token: string | null;
    }) =>
      await confirmNewPassword(values, token).then((message) => {
        if (message?.error) {
          toast.error(message.error);
          return message.error;
        }
        if (message?.success) {
          toast.success(message.success);
          return message.success;
        }
      }),
  });
};
