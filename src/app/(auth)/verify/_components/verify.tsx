"use client";

import React, { useState, useRef } from "react";
import { useVerifyOtp } from "@/features/auth/api/verify-otp";
import { useSearchParams, useRouter } from "next/navigation";
import { SpinnerV2 } from "@/components/ui/spinner";
import { OtpGroup } from "./otp-group";
import Link from "next/link";
import { useResendOtp } from "@/features/auth/api/resend-otp";
import { toast } from "sonner";
import { PrivacyPolicyModal } from "@/components/shared/privacy-policy-modal";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(60);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const lastSubmittedOtpRef = useRef<string>("");

  // 60-second cooldown timer for resend OTP
  React.useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

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
        setErrorMessage(null);
        toast.success("Verifikasi berhasil!");
        router.replace("/");
      },
      onError: (error: any) => {
        lastSubmittedOtpRef.current = "";
        const cleanMsg =
          error?.message?.includes("429")
            ? "Terlalu banyak percobaan. Harap tunggu beberapa saat."
            : error?.message || "Kode OTP salah atau telah kedaluwarsa. Silakan periksa kembali.";
        setErrorMessage(cleanMsg);
        setOtp(""); // Reset kotak input OTP menjadi kosong
        toast.error(cleanMsg); // Tampilkan popup toast error
        triggerShake(); // Jalankan getaran kotak OTP dan haptic
      },
    },
  });

  const { mutate: resendOtp, isPending: resendLoading } = useResendOtp({
    mutationConfig: {
      onSuccess: () => {
        setErrorMessage(null);
        setOtp("");
        setCountdown(60); // Reset timer 60 detik cooldown
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
    <div className="min-h-screen w-full bg-background flex flex-col justify-between items-center pt-5 sm:pt-7 pb-8 sm:pb-12 px-4 font-sans select-none relative">
      {/* Fullscreen High Z-Index Overlay Loader */}
      {verifyLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs select-none">
          <div className="flex flex-col items-center gap-3.5">
            <SpinnerV2 className="w-8 h-8 text-neutral-900 animate-spin stroke-[1.5]" />
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-800 font-semibold">
              Memverifikasi...
            </p>
          </div>
        </div>
      )}

      {/* 1. TOP: Centered Bold Brand Logo (Large with CASE font-black) */}
      <div className="w-full flex justify-center pt-1 sm:pt-2">
        <Link
          href="/"
          className="text-4xl sm:text-5xl lg:text-[52px] tracking-tight uppercase text-neutral-900 font-sans hover:opacity-85 transition-opacity leading-none"
        >
          <span className="font-semibold">IDSHOP</span>
          <span className="font-black">CASE</span>
        </Link>
      </div>

      {/* 2. CENTER: Exact THENBLANK / Shopify "Enter code" Form */}
      <div className="w-full max-w-[380px] sm:max-w-[450px] mx-auto my-auto py-8">
        <div className="flex flex-col items-start text-left space-y-6 sm:space-y-7 w-full">
          {/* Main Title & Subtitle (Spacious & Clean for Long Emails) */}
          <div className="space-y-2 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-sans">
              Enter code
            </h1>
            <div className="text-xs sm:text-sm text-neutral-500 font-normal space-y-1">
              <p className="leading-relaxed">
                <span>Sent to </span>
                <span className="text-neutral-900 font-medium break-all">
                  {email || "your email"}
                </span>
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="text-neutral-900 hover:underline font-medium cursor-pointer ml-2 inline-block shrink-0"
                >
                  Change
                </button>
              </p>
              <p className="text-xs text-neutral-400 font-normal">
                Code is valid for 10 minutes
              </p>
            </div>
          </div>

            {/* 6 OTP Input Boxes with Key-Based Shake Motion */}
            <div className="w-full flex justify-center">
              <OtpGroup
                value={otp}
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
                disabled={!email || resendLoading || verifyLoading || countdown > 0}
                onClick={() => {
                  if (email && countdown <= 0) resendOtp({ email });
                }}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  countdown > 0
                    ? "text-neutral-400 cursor-not-allowed"
                    : "text-neutral-900 hover:underline cursor-pointer"
                } ${resendLoading ? "opacity-60" : ""}`}
              >
                {resendLoading
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend code (${countdown}s)`
                  : "Resend code"}
              </button>
            </div>
          </div>
      </div>

      {/* 3. BOTTOM: Privacy Policy Modal Trigger (Zero Page Reload, Preserves OTP state) */}
      <div className="w-full flex justify-center pb-2">
        <PrivacyPolicyModal
          trigger={
            <button
              type="button"
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors font-sans cursor-pointer underline-offset-4 hover:underline"
            >
              Privacy policy
            </button>
          }
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
