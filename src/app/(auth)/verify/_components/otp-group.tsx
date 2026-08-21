"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";

type OtpGroupProps = {
  value: string;
  setOtp: (otp: string) => void;
  disabled?: boolean;
  shakeKey?: number;
  isError?: boolean;
};

export const OtpGroup = ({
  value,
  setOtp,
  disabled = false,
  shakeKey = 0,
  isError = false,
}: OtpGroupProps) => {
  return (
    <motion.div
      key={shakeKey}
      animate={
        shakeKey > 0
          ? { x: [0, -14, 14, -12, 12, -8, 8, -4, 4, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="w-full"
    >
      <InputOTP
        value={value}
        maxLength={6}
        disabled={disabled}
        autoFocus
        onChange={(val) => {
          setOtp(val);
        }}
      >
        <InputOTPGroup className="gap-2 sm:gap-3 w-full justify-between">
          <InputOTPSlot
            index={0}
            className={`h-16 w-12 sm:w-14 text-2xl sm:text-3xl font-semibold border bg-white rounded-md first:rounded-md last:rounded-md transition-all shadow-none ${
              isError
                ? "border-red-500 text-red-600 data-[active=true]:border-red-600 data-[active=true]:ring-red-500/20"
                : "border-neutral-300 data-[active=true]:border-black data-[active=true]:ring-1 data-[active=true]:ring-black"
            }`}
          />
          <InputOTPSlot
            index={1}
            className={`h-16 w-12 sm:w-14 text-2xl sm:text-3xl font-semibold border bg-white rounded-md first:rounded-md last:rounded-md transition-all shadow-none ${
              isError
                ? "border-red-500 text-red-600 data-[active=true]:border-red-600 data-[active=true]:ring-red-500/20"
                : "border-neutral-300 data-[active=true]:border-black data-[active=true]:ring-1 data-[active=true]:ring-black"
            }`}
          />
          <InputOTPSlot
            index={2}
            className={`h-16 w-12 sm:w-14 text-2xl sm:text-3xl font-semibold border bg-white rounded-md first:rounded-md last:rounded-md transition-all shadow-none ${
              isError
                ? "border-red-500 text-red-600 data-[active=true]:border-red-600 data-[active=true]:ring-red-500/20"
                : "border-neutral-300 data-[active=true]:border-black data-[active=true]:ring-1 data-[active=true]:ring-black"
            }`}
          />
          <InputOTPSlot
            index={3}
            className={`h-16 w-12 sm:w-14 text-2xl sm:text-3xl font-semibold border bg-white rounded-md first:rounded-md last:rounded-md transition-all shadow-none ${
              isError
                ? "border-red-500 text-red-600 data-[active=true]:border-red-600 data-[active=true]:ring-red-500/20"
                : "border-neutral-300 data-[active=true]:border-black data-[active=true]:ring-1 data-[active=true]:ring-black"
            }`}
          />
          <InputOTPSlot
            index={4}
            className={`h-16 w-12 sm:w-14 text-2xl sm:text-3xl font-semibold border bg-white rounded-md first:rounded-md last:rounded-md transition-all shadow-none ${
              isError
                ? "border-red-500 text-red-600 data-[active=true]:border-red-600 data-[active=true]:ring-red-500/20"
                : "border-neutral-300 data-[active=true]:border-black data-[active=true]:ring-1 data-[active=true]:ring-black"
            }`}
          />
          <InputOTPSlot
            index={5}
            className={`h-16 w-12 sm:w-14 text-2xl sm:text-3xl font-semibold border bg-white rounded-md first:rounded-md last:rounded-md transition-all shadow-none ${
              isError
                ? "border-red-500 text-red-600 data-[active=true]:border-red-600 data-[active=true]:ring-red-500/20"
                : "border-neutral-300 data-[active=true]:border-black data-[active=true]:ring-1 data-[active=true]:ring-black"
            }`}
          />
        </InputOTPGroup>
      </InputOTP>
    </motion.div>
  );
};

export default OtpGroup;
