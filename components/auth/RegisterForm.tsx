"use client";
import { RegisterSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Oval } from "react-loader-spinner";
import {
  useCreateAccount,
  useOAuthSignIn,
} from "@/lib/react-query/queries&mutation";
import { NetworkStatusContext } from "@/utils/providers/NetworkStatusProvider";
import GoogleSignInButton from "./GoogleSignInButton";
import GithubSignInButton from "./GithubSignInButton";
import Image from "next/image";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const RegisterForm = () => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const {
    mutateAsync: OAtuhSignIn,
    variables,
    isLoading: isOAuthSignInLoading,
  } = useOAuthSignIn();

  const {
    mutate: createAccount,
    isLoading: isCredentialSignUpLoading,
    isSuccess,
    data,
  } = useCreateAccount();

  const netwrokStatus = useContext(NetworkStatusContext);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    if (!netwrokStatus) return;
    await createAccount(values);
  };

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto">
      <h1 className="text-4xl font-bold text-gray-700">Get started</h1>
      <p className="text-gray-600 mt-2 font-semibold">Create a new account</p>
      {data !== "Confirmation email sent!" ? (
        <>
          <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-600   "
              >
                Username
              </label>
              <input
                {...form.register("username")}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-600  bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {form.formState.errors.username && (
                <span className="text-xs text-slate-500">
                  {form.formState.errors.username.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-600  mt-4 "
              >
                Email
              </label>
              <input
                {...form.register("email")}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-600  bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {form.formState.errors.email && (
                <span className="text-xs text-slate-500">
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600 "
                >
                  Password
                </label>
              </div>

              <div className="flex flex-row w-full px-4 py-2 mt-2 text-gray-600 bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 gap-2">
                <input
                  {...form.register("password")}
                  type={isPasswordShow ? "text" : "password"}
                  className="outline-none border-none w-full"
                />
                <Image
                  src={
                    isPasswordShow
                      ? "/assets/show-icone.svg"
                      : "/assets/hide-icone.svg"
                  }
                  alt=""
                  width={20}
                  height={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsPasswordShow((prev) => !prev);
                  }}
                />
              </div>
              {form.formState.errors.password && (
                <span className="text-xs text-slate-500">
                  {form.formState.errors.password.message}
                </span>
              )}
            </div>

            <div className="mt-6">
              <button
                disabled={isCredentialSignUpLoading || isOAuthSignInLoading}
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-60 flex flex-row gap-2 justify-center"
              >
                {isCredentialSignUpLoading && (
                  <Oval
                    width={20}
                    height={20}
                    color="white"
                    strokeWidth={4}
                    secondaryColor="gray"
                  />
                )}
                Send confirmation email
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/5"></span>

            <Link
              href="#"
              className="text-xs text-center text-gray-500 uppercase  hover:underline"
            >
              or Register with Social Media
            </Link>

            <span className="w-1/5 border-b  lg:w-1/5"></span>
          </div>
          {/**Social Links */}
          <div className="flex flex-col gap-3 items-center mt-6 ">
            <GoogleSignInButton
              isCredentialSignInLoading={isCredentialSignUpLoading}
              netwrokStatus={netwrokStatus}
              OAtuhSignIn={OAtuhSignIn}
              isOAuthSignInLoading={isOAuthSignInLoading}
              variables={variables}
            />

            <GithubSignInButton
              isCredentialSignInLoading={isCredentialSignUpLoading}
              netwrokStatus={netwrokStatus}
              OAtuhSignIn={OAtuhSignIn}
              isOAuthSignInLoading={isOAuthSignInLoading}
              variables={variables}
            />
          </div>{" "}
        </>
      ) : (
        <div className="border-[3px] rounded-md p-4 border-gray-400 text-gray-800 mt-4 relative flex flex-row gap-2 ">
          <CheckCircledIcon className="w-8 h-6 " />
          <p>
            Email verification sent. please check your email and click on
            verification link
          </p>
        </div>
      )}

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        {"Already have an account?"}
        <Link
          href={
            isCredentialSignUpLoading || isOAuthSignInLoading ? "" : "/login"
          }
          className="font-medium text-gray-700  hover:underline"
        >
          Login now
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
