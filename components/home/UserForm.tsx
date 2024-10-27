"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { InfromationField } from "../InfromationField";
import { auth } from "@/auth";

const UserForm = () => {
  const { data } = useSession();
  

  return (
    <div className="m-auto flex flex-col max-md:min-w-[320px] min-w-[600px] justify-center items-center bg-white shadow-lg rounded-lg gap-5 p-5">
      <h1 className="font-bold text-4xl text-gray-800">User information</h1>
      <InfromationField name={data?.user?.id} label="id" />
      <InfromationField name={data?.user?.name} label="Username" />
      <InfromationField name={data?.user?.email} label="Email" />
      <InfromationField name={data?.user?.role} label="Role" />

        <div className="w-full flex items-end justify-end">
      <button className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-400" onClick={()=>signOut()}>Sign Out!</button>
      </div>
    </div>
  );
};

export default UserForm;
