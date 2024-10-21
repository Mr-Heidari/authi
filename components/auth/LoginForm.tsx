"use client"
import { loginAccount } from "@/actions/login";
import { LoginSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import Social from "@/components/Social";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit =async (values: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");

    await loginAccount(values).then((message) => {
      setError(message?.error);

    });
  };
  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto">
      <h1 className="text-4xl font-bold text-gray-700">Sign in.</h1>

      <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="block text-sm text-gray-800  ">
            Email
          </label>
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

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm text-gray-800 ">
              Password
            </label>
            <a href="#" className="text-xs text-gray-600  hover:underline">
              Forget Password?
            </a>
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
        <div>
            <FormError message={error} />
          </div>
          <div>
            <FormSuccess message={success} />
          </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b  lg:w-1/5"></span>

        <Link
          href="#"
          className="text-xs text-center text-gray-500 uppercase  hover:underline"
        >
          or login with Social Media
        </Link>

        <span className="w-1/5 border-b  lg:w-1/5"></span>
      </div>

      <Social/>

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        {"Don't have and account?"}
        <Link href="/register" className="font-medium text-gray-700  hover:underline">
          Create One
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
