import Link from "next/link";

import React from "react";

const ErrorPage = () => {
  return (
    <div className="m-auto flex flex-col gap-2">
      <h1 className="font-bold text-2xl text-gray-800">
        Oops somthing went worng!
      </h1>
      <p className="mt-8 text-xs font-light text-center text-gray-400">
        <Link
          href={"/login"}
          className="font-medium text-gray-700  hover:underline"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
