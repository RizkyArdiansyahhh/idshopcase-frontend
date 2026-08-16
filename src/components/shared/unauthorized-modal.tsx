"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function UnauthorizedModal() {
  const t = useTranslations("auth.unauthorizedModal");
  const router = useRouter();
  const { isOpen, reason, redirectUrl, closeModal } = useAuthModalStore();

  const handleSignIn = () => {
    closeModal();
    const loginUrl = redirectUrl
      ? `/login?redirect=${encodeURIComponent(redirectUrl)}`
      : "/login";
    router.push(loginUrl);
  };

  const handleSignUp = () => {
    closeModal();
    router.push("/register");
  };

  const isSessionExpired = reason === "session_expired";
  const title = isSessionExpired ? t("sessionExpiredTitle") : t("loginRequiredTitle");
  const description = isSessionExpired ? t("sessionExpiredDesc") : t("loginRequiredDesc");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-[340px] sm:max-w-[380px] p-6 sm:p-7 rounded-3xl border border-border/70 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden focus:outline-none">
        <div className="flex flex-col items-center text-center space-y-4 pt-1">
          {/* Headlines */}
          <div className="space-y-2">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground">
              {title}
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed px-1">
              {description}
            </p>
          </div>

          {/* Vertical Stack of Action Buttons */}
          <div className="w-full flex flex-col gap-2 pt-2">
            {/* Primary Action: Sign In */}
            <Button
              onClick={handleSignIn}
              className="w-full h-11 rounded-xl text-xs sm:text-sm font-medium shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {t("signInBtn")}
            </Button>

            {/* Secondary Action: Sign Up */}
            <Button
              variant="outline"
              onClick={handleSignUp}
              className="w-full h-11 rounded-xl text-xs sm:text-sm font-medium border-border/70 hover:bg-muted transition-all"
            >
              {t("signUpBtn")}
            </Button>

            {/* Close / Later */}
            <Button
              variant="ghost"
              onClick={closeModal}
              className="w-full h-8 text-xs font-normal text-muted-foreground hover:text-foreground rounded-lg"
            >
              {t("laterBtn")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UnauthorizedModal;
