"use client";
import { Separator } from "@/components/ui/separator";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { useState } from "react";
import { IoIosLock } from "react-icons/io";

const ForgotPassword = () => {
  const [onSuccess, setOnSuccess] = useState(false);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-foreground/5">
        <div className="w-2/5 max-h-fit bg-background border rounded-[12px] shadow-md px-8 py-14">
          <div className="flex items-center flex-col">
            <div
              className="p-5  rounded-full w-fit
            bg-gradient-to-b from-foreground/10 to-transparent
            "
            >
              <div className="h-16 w-16 rounded-full bg-background border shadow-md flex justify-center items-center">
                <IoIosLock size={40} />
              </div>
            </div>
            <div className="text-foreground/70 flex gap-2 flex-col">
              <h1 className="text-3xl font-bold text-center">Lupa Password</h1>
              <p className="text-sm text-muted-foreground text-center">
                Masukkan email untuk mendapatkan link reset password
              </p>
            </div>
          </div>
          <div className="w-full border-t border-dashed border-gray-300 my-4" />
          {onSuccess ? (
            <p className="text-center text-foreground/60">
              <span className="text-foreground/70">
                Link reset password telah dikirim ke email anda
              </span>
            </p>
          ) : (
            <ForgotPasswordForm
              onSuccess={() => {
                setOnSuccess(true);
              }}
            ></ForgotPasswordForm>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
