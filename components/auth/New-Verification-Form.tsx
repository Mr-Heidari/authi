"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Logo from "@/components/Logo";
import { redirect, useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import FormError from "../FormError";
import Link from "next/link";

const NewVerificationFrom = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const handleConfirmation = useCallback(() => {
    if (!token) return;

    newVerification(token)
      .then((message) => {
        setError(message?.error);
        setSuccess(message?.success);
      })
      .catch(() => {
        setError("Somthing went wrong!");
      });

    if (success === "Back to login") redirect("/login");
  }, [token, success]);

  useEffect(() => {
    handleConfirmation();
  }, [handleConfirmation]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white shadow-md items-center justify-center p-5 rounded-md gap-4">
      <Logo width={110} height={40} />
      <p className="text-gray-500">Confirming your verification!</p>
      {error ? (
        <>
          <FormError message={error} />
        </>
      ) : (
        <ThreeDots width={40} height={20} color="darkcyan" />
      )}
       <p className=" text-xs font-light text-center text-gray-400">
        <Link
          href={'/login'}
          className="font-medium text-gray-700  hover:underline"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default NewVerificationFrom;
