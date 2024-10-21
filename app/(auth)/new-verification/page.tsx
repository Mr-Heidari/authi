import NewVerificationFrom from "@/components/auth/New-Verification-Form";

import React, { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <div>
      <Suspense>
        <NewVerificationFrom />
      </Suspense>
    </div>
  );
};

export default NewVerificationPage;
