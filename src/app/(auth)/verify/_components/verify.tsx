"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { BsEnvelopePaperFill } from "react-icons/bs";
import { useVerifyOtp } from "@/features/auth/api/verify-otp";
import { useSearchParams } from "next/navigation";
import { SpinnerV2 } from "@/components/ui/spinner";
import { VerifySuccess } from "./verify-success";
import { OtpGroup } from "./otp-group";
import Countdown from "react-countdown";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState<string>("");
  const [expired, setExpired] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);
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
    const saved = localStorage.getItem("otp_expired_at");
    if (!saved) {
    }
    setExpired(Number(saved));
  }, []);

  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem("otp_expired_at");
    }
  }, [isExpired]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background md:bg-foreground/5">
      <div className="w-full md:w-1/2 h-fit md:border p-6 rounded-lg flex justify-center items-center   md:shadow-sm  md:bg-background py-10 ">
        {emailVerified ? (
          <VerifySuccess></VerifySuccess>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="text-center flex flex-col items-center">
              <BsEnvelopePaperFill size={80} className="mb-4" />

              <p className="text-xl md:text-2xl font-semibold text-foreground">
                Masukkan Kode Verifikasi
              </p>
              <p className="text-sm md:text-base font-light">
                Kode Verifikasi akan dikirim melalui email Anda
              </p>
              {expired && !isExpired && (
                <Countdown
                  date={expired}
                  onComplete={() => setIsExpired(true)}
                  renderer={({ hours, minutes, seconds, completed }) => {
                    if (completed) {
                      return (
                        <span className="text-xs text-destructive">
                          Kode verifikasi telah kadaluarsa
                        </span>
                      );
                    }

                    return (
                      <div className="px-3 py-2 text-xs md:text-sm flex flex-col items-center gap-2">
                        <p>Kode verifikasi akan kadaluarsa dalam</p>
                        <div className="font-semibold text-sm">
                          {String(hours).padStart(2, "0")}:
                          {String(minutes).padStart(2, "0")}:
                          {String(seconds).padStart(2, "0")}
                        </div>
                      </div>
                    );
                  }}
                />
              )}
            </div>
            <div className="flex flex-col items-center gap-6">
              <OtpGroup setOtp={setOtp}></OtpGroup>
              <Button
                disabled={!email || otp.length < 6 || verifyLoading}
                onClick={() => {
                  if (email === null) return;
                  verify({ otp, email });
                }}
                className="w-full"
              >
                {verifyLoading ? <SpinnerV2></SpinnerV2> : "Verifikasi"}
              </Button>
            </div>

            <div className="flex flex-row justify-center  items-center gap-2">
              <p className="text-xs md:text-sm text-foreground/70">
                Belum menerima kode?
              </p>
              <p className="text-xs md:text-sm text-foreground/70 underline">
                Minta Kode Baru
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
