import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
const FormSuccess = ({ message = "" }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-lime-100 text-lime-600 p-3 rounded-md flex flex-row gap-3 items-center w-fit mt-4">
      <CheckCircledIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
export default FormSuccess