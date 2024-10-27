import AuthBackground from "@/components/AuthBackground";
import Logo from "@/components/Logo";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row min-h-[100%] justify-between">
      <div className="absolute">
        <Logo width={110} height={40} />
      </div>
      {children}
      <div className=" relative basis-[50%] max-lg:hidden ">
        <AuthBackground authType={'Register'}/>
      </div>
    </div>
  );
};

export default AuthLayout;
