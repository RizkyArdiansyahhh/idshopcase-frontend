"use client";

import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const { push } = useRouter();
  console.log(token);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-foreground/5">
      <div className="w-2/6  bg-card p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <Separator className="border-dashed border-muted mb-5" />

        <ResetPasswordForm
          token={token as string}
          onSuccess={() => {
            alert("Password berhasil direset!");
            push("/login");
          }}
        />
      </div>
    </div>
  );
}
