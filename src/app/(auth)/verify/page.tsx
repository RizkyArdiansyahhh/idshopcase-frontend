"use client";

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { BsEnvelopePaperFill } from "react-icons/bs";
import { useVerifyOtp } from "@/features/auth/api/verify-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { OtpGroup } from "./_components/otp-group";
import { SpinnerV2 } from "@/components/ui/spinner";
import { VerifySuccess } from "./_components/verify-success";

const VerifyEmailPage = () => {
  const [seconds, setSeconds] = useState(180);
  const [otp, setOtp] = useState<string>("");
  const searchParams = useSearchParams();
  const [emailVerified, setEmailVerified] = useState(false);
  const email = searchParams.get("email");

  const { mutate: verify, isPending: verifyLoading } = useVerifyOtp({
    mutationConfig: {
      onSuccess: () => {
        setEmailVerified(true);
      },
    },
  });

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-foreground/5">
      <div className="w-1/2 h-fit border p-6 rounded-lg flex justify-center items-center  shadow-sm bg-background py-4 ">
        {emailVerified ? (
          <VerifySuccess></VerifySuccess>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="text-center flex flex-col items-center">
              <BsEnvelopePaperFill size={80} className="mb-4" />

              <p className="text-2xl font-semibold text-foreground">
                Masukkan Kode Verifikasi
              </p>
              <p className="text-md font-light">
                Kode Verifikasi akan dikirim melalui email Anda
              </p>
              {seconds > 0 ? (
                <p className="text-sm text-foreground/70 mt-2">
                  Kode berlaku selama {seconds} detik
                </p>
              ) : (
                <p className="text-sm text-red-500 mt-2">
                  Kode telah kadaluarsa. Silakan minta kode baru.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <OtpGroup setOtp={setOtp}></OtpGroup>
              <Button
                disabled={otp.length < 6 || verifyLoading}
                onClick={() => {
                  if (email === null) return;
                  verify({ otp, email });
                }}
              >
                {verifyLoading ? <SpinnerV2></SpinnerV2> : "Verifikasi"}
              </Button>
            </div>

            <div className="flex flex-row justify-center  items-center gap-2">
              <p className="text-sm text-foreground/70">Belum menerima kode?</p>
              <p className="text-sm text-foreground/70 underline">
                Minta Kode Baru
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
