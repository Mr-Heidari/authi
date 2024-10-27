import NewPasswordForm from "@/components/auth/NewPasswordForm";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <div className="max-lg:min-w-[330px] m-auto">
      <Suspense>
        {" "}
        <NewPasswordForm />
      </Suspense>
    </div>
  );
};

export default Page;
