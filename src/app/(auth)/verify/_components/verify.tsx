"use client";

import React, { useState, useRef } from "react";
import { useVerifyOtp } from "@/features/auth/api/verify-otp";
import { useSearchParams, useRouter } from "next/navigation";
import { SpinnerV2 } from "@/components/ui/spinner";
import { VerifySuccess } from "./verify-success";
import { OtpGroup } from "./otp-group";
import Link from "next/link";
import { useResendOtp } from "@/features/auth/api/resend-otp";
import { toast } from "sonner";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [emailVerified, setEmailVerified] = useState(false);
  const email = searchParams.get("email");
  const lastSubmittedOtpRef = useRef<string>("");

  const triggerShake = () => {
    setShakeKey((prev) => prev + 1);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch {
        // Ignore devices without vibration support
      }
    }
  };

  const { mutate: verify, isPending: verifyLoading } = useVerifyOtp({
    mutationConfig: {
      onSuccess: () => {
        setEmailVerified(true);
        setErrorMessage(null);
      },
      onError: (error: any) => {
        const cleanMsg =
          error?.message?.includes("429")
            ? "Terlalu banyak percobaan. Harap tunggu beberapa saat."
            : error?.message || "Kode OTP salah atau telah kedaluwarsa";
        setErrorMessage(cleanMsg);
        triggerShake();
      },
    },
  });

  const { mutate: resendOtp, isPending: resendLoading } = useResendOtp({
    mutationConfig: {
      onSuccess: () => {
        setErrorMessage(null);
        lastSubmittedOtpRef.current = "";
        toast.success("Kode OTP baru telah dikirim ke email Anda");
      },
      onError: (error: any) => {
        const cleanMsg =
          error?.message?.includes("429")
            ? "Terlalu sering meminta kode. Harap tunggu sebentar."
            : error?.message || "Gagal mengirim ulang kode OTP";
        toast.error(cleanMsg);
      },
    },
  });

  // Explicit handler triggered on OTP change - ONLY triggers once per unique 6-digit input
  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (errorMessage) {
      setErrorMessage(null);
    }

    if (value.length === 6 && value !== lastSubmittedOtpRef.current && email && !verifyLoading) {
      lastSubmittedOtpRef.current = value;
      verify({ otp: value, email });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-between items-center py-12 sm:py-16 px-4 font-sans select-none">
      {/* 1. TOP: Centered Bold Brand Logo (Large with CASE font-black) */}
      <div className="w-full flex justify-center pt-4 sm:pt-8">
        <Link
          href="/"
          className="text-3xl sm:text-4xl lg:text-[40px] tracking-wide uppercase text-neutral-900 font-sans hover:opacity-85 transition-opacity leading-none"
        >
          <span className="font-semibold">IDSHOP</span>
          <span className="font-black">CASE</span>
        </Link>
      </div>

      {/* 2. CENTER: Exact THENBLANK / Shopify "Enter code" Form */}
      <div className="w-full max-w-[340px] sm:max-w-[410px] mx-auto my-auto py-8">
        {emailVerified ? (
          <VerifySuccess />
        ) : (
          <div className="flex flex-col items-start text-left space-y-4 w-full">
            {/* Main Title & Subtitle */}
            <div className="space-y-1.5 w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-sans">
                Enter code
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 font-normal flex items-center gap-1.5 flex-wrap">
                <span>Sent to {email || "your email"}</span>
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="text-neutral-900 hover:underline font-medium cursor-pointer"
                >
                  Change
                </button>
              </p>
            </div>

            {/* 6 OTP Input Boxes with Key-Based Shake Motion */}
            <div className="pt-2 w-full flex justify-center">
              <OtpGroup
                setOtp={handleOtpChange}
                disabled={verifyLoading}
                shakeKey={shakeKey}
                isError={!!errorMessage}
              />
            </div>

            {/* Error Message if OTP is incorrect */}
            {errorMessage && (
              <p className="text-xs text-red-600 font-medium animate-fade-in">
                {errorMessage}
              </p>
            )}

            {/* Loading / Resend State (Perfect Horizontal Alignment) */}
            <div className="flex items-center justify-between w-full pt-2 text-xs sm:text-sm text-neutral-500">
              <div>
                {verifyLoading ? (
                  <span className="flex items-center gap-1.5 text-neutral-900 font-medium">
                    <SpinnerV2 className="w-3.5 h-3.5" />
                    <span>Verifying...</span>
                  </span>
                ) : (
                  <span>Didn't get a code?</span>
                )}
              </div>

              <button
                type="button"
                disabled={!email || resendLoading || verifyLoading}
                onClick={() => {
                  if (email) resendOtp({ email });
                }}
                className="text-neutral-900 hover:underline font-medium disabled:opacity-40 cursor-pointer text-xs sm:text-sm"
              >
                {resendLoading ? "Sending..." : "Resend code"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM: Privacy Policy Link (Exact Shopify Footer) */}
      <div className="w-full flex justify-center pb-2">
        <Link
          href="/privacy"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors font-sans"
        >
          Privacy policy
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
