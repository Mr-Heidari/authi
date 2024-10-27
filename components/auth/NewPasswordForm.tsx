"use client";

import { NewPasswordSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useConfirmNewPassword } from "@/lib/react-query/queries&mutation";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Oval, ThreeDots } from "react-loader-spinner";

const NewPasswordForm = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const router = useRouter();
  const {
    mutate: confirmNewPassword,
    isLoading,
    data,
  } = useConfirmNewPassword();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    await confirmNewPassword({ values: values, token: token });
  };

  useEffect(() => {
    if (data === "Password updated!")
      setTimeout(() => {
        router.push("/login");
      }, 1000);
  }, [data]);
  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto">
      <h1
        className="text-4xl font-bold text-gray-700"
        onClick={() => console.log(data)}
      >
        Enter a new password
      </h1>
      {data !== "Password updated!" ? (
        <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 "
              >
                Password
              </label>
            </div>

            <input
              {...form.register("password")}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {form.formState.errors.password && (
              <span className="text-xs text-slate-500">
                {form.formState.errors.password.message}
              </span>
            )}
          </div>
          <div className="mt-6">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-60 flex flex-row gap-2 justify-center"
            >
              {" "}
              {isLoading && (
                <Oval
                  width={20}
                  height={20}
                  color="white"
                  strokeWidth={4}
                  secondaryColor="#d6d6d6"
                />
              )}
              Confirm your new password
            </button>
          </div>
        </form>
      ) : (
        <div className="border-[3px] rounded-md p-4 border-gray-400 text-gray-800 mt-4 relative flex flex-col gap-2 ">
          <div className="flex flex-row">
            <CheckCircledIcon className="w-8 h-6 " />
            <p>You'r password updated!.</p>
          </div>
          <p className="ml-2 flex flex-row gap-2">
            redirecting to login page
            <ThreeDots width={40} height={30} color="gray" />{" "}
          </p>
        </div>
      )}

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        <Link
          href={` ${isLoading ? "" : "/login"}`}
          className="font-medium text-gray-700  hover:underline"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default NewPasswordForm;
