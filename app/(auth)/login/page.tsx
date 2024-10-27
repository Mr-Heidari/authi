import LoginForm from "@/components/auth/LoginForm";

import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="lg:basis-[50%] max-lg:m-auto max-lg:min-w-[330px] my-auto">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
