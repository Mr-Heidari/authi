import React, { useCallback, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Logo from "@/components/Logo";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";

const NewVerificationFrom = () => {
  const token = useSearchParams().get("token");
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
  }, [token]);

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
      ) : success ? (
        <>
          <FormSuccess message={success} />
        </>
      ) : (
        <ThreeDots width={40} height={20} color="darkcyan" />
      )}
    </div>
  );
};

export default NewVerificationFrom;
