import AuthBackground from "@/components/auth/AuthBackground";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/Logo";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="lg:basis-[50%] max-lg:m-auto max-lg:min-w-[330px] my-auto">
      <RegisterForm />
    </div>
    // <div className="flex flex-row min-h-[100%] justify-between rounded-lg drop-shadow-md">
    //   <div className="absolute">
    //     <Logo width={110} height={40} />
    //   </div>
    //   <div className="lg:basis-[50%] max-lg:m-auto max-lg:min-w-[330px] my-auto">
    //     <RegisterForm />
    //   </div>
    //   <div className=" relative basis-[50%] max-lg:hidden ">
    //     <AuthBackground authType={'Login'}/>
    //   </div>
    // </div>
  );
};

export default RegisterPage;
