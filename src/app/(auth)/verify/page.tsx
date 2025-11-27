export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { VerifyEmail } from "./_components/verify";

const VerifyEmailPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmail />
      </Suspense>
    </>
  );
};

export default VerifyEmailPage;
