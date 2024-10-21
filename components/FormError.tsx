import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
const FormError = ({ message='' }: { message?: string }) => {

  if(!message) return null  
  return (
    <div className="bg-red-100 text-red-500 p-3 rounded-md flex flex-row gap-3 items-center w-fit mt-4">
      <ExclamationTriangleIcon className="w-4 h-4"/>
      <p>{message}</p>
    </div>
  );
};

export default FormError;
