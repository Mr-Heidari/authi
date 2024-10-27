"use client";
import { useResetPasswordRequest } from "@/lib/react-query/queries&mutation";
import { ResetPasswordSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { z } from "zod";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: resetPasswordRequest,
    isLoading,
    data,
  } = useResetPasswordRequest();
  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    await resetPasswordRequest(values);
  };

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto">
      <h1 className="text-4xl font-bold text-gray-700">Password reset.</h1>
      {data !== "Reset request sent!" ? (
        <form className="mt-6 min-w-[320px]" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm text-gray-800 mt-4 ">Email</label>
            <input
              {...form.register("email")}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {form.formState.errors.email && (
              <span className="text-xs text-slate-500">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>
          <div className="mt-6">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-60 flex flex-row gap-2 justify-center"
            >
              {isLoading && (
                <Oval
                  width={20}
                  height={20}
                  color="white"
                  strokeWidth={4}
                  secondaryColor="#d6d6d6"
                />
              )}
              <p>Send reset password request</p>
            </button>
          </div>
        </form>
      ) : (
        <div className="border-[3px] rounded-md p-4 border-gray-400 text-gray-800 mt-4 relative flex flex-row gap-2 ">
          <CheckCircledIcon className="w-8 h-6 " />
          <p>
            Reset password request sent. please check your email and click on
            link
          </p>
        </div>
      )}
      <p className="mt-8 text-xs font-light text-center text-gray-400">
        <Link
          href={isLoading ? "" : "/register"}
          className="font-medium text-gray-700  hover:underline"
        >
          Back to login page
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordForm;
