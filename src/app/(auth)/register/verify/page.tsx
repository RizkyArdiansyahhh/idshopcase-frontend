"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const VerifyEmailPage = () => {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-1/2 h-1/2 border p-6 rounded-[12px] flex justify-center items-center backdrop-blur-2xl flex-col gap-16 shadow-sm">
        <div className="text-center">
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
          <InputOTPWithSeparator />
          <Button>Verifikasi</Button>
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          <p className="text-sm text-foreground/70">Belum menerima kode?</p>
          <p className="text-sm text-foreground/70 underline">
            Minta Kode Baru
          </p>
        </div>
      </div>
    </div>
  );
};

export function InputOTPWithSeparator() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

export default VerifyEmailPage;
