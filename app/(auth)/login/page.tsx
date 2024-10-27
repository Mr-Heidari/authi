import AuthBackground from "@/components/auth/AuthBackground";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/Logo";

import React from "react";

const LoginPage = () => {
  return (
    <div className="lg:basis-[50%] max-lg:m-auto max-lg:min-w-[330px] my-auto">
      <LoginForm />
    </div>
    // <div className="flex flex-row min-h-[100%] justify-between rounded-lg drop-shadow-md">
    //   <div className="absolute  max-sm:m-[4%]">
    //     <Logo width={110} height={40} />
    //   </div>
    //   <div className="lg:basis-[50%] max-lg:m-auto max-lg:min-w-[330px] my-auto">
    //     <LoginForm />
    //   </div>
    //   <div className=" relative basis-[50%] max-lg:hidden ">
    //     <AuthBackground authType={'Register'}/>
    //   </div>
    // </div>
  );
};

export default LoginPage;
