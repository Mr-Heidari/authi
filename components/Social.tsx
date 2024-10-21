"use client";

import { signIn } from "next-auth/react";
import { login_redirect_route } from "@/routes";
import React from "react";

const Social = () => {
  const onClick = (providers: "google" | "github") => {
    signIn(providers, {
      callbackUrl: login_redirect_route,
    });
  };
  return (
    <div className="flex flex-col gap-3 items-center mt-6 ">
      <button
        onClick={() => onClick("google")}
        type="button"
        className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
      >
        <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
        </svg>

        <span className="mx-2">Sign in with Google</span>
      </button>

      <button
        onClick={() => onClick("github")}
        type="button"
        className="flex items-center justify-center w-full px-6 py-1 mx-2 text-sm font-medium text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-100 border-slate-400 focus:bg-blue-400 focus:outline-none border-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
          ></path>
        </svg>

        <span className=" text-slate-900 mx-2">
          Sign in with Github
        </span>
      </button>
    </div>
  );
};

export default Social;
{
  /* <div className="flex flex-row gap-3">
{" "}
<Button
  disabled={isPending}
  className="w-full"
  variant={"secondary"}
  onClick={() => onClick("google")}
>
  <FcGoogle className="h-6 w-6" />
</Button>
<Button
  disabled={isPending}
  className="w-full"
  variant={"secondary"}
  onClick={() => onClick("github")}
>
  <FaGithub className="h-6 w-6" />
</Button>
</div> */
}
