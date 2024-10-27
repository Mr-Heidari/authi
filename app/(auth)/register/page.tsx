import RegisterForm from "@/components/auth/RegisterForm";

import React, { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div className="lg:basis-[50%] max-lg:m-auto max-lg:min-w-[330px] my-auto">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
