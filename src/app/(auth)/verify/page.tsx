export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { VerifyEmail } from "./_components/verify";
import Loader from "@/components/shared/loaders";

const VerifyEmailPage = () => {
  return (
    <>
      <Suspense fallback={<Loader></Loader>}>
        <VerifyEmail />
      </Suspense>
    </>
  );
};

export default VerifyEmailPage;
