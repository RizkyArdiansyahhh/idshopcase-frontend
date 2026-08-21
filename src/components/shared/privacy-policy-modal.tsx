"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PrivacyPolicyContent } from "./privacy-policy-content";
import { useTranslations } from "next-intl";

interface PrivacyPolicyModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  trigger,
  open,
  onOpenChange,
}) => {
  const t = useTranslations("privacy");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        showCloseButton={false}
        className="max-w-[680px] w-[92vw] sm:w-[85vw] max-h-[82vh] overflow-y-auto overflow-x-hidden bg-white p-5 sm:p-8 rounded-none border border-neutral-200 shadow-2xl font-sans"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>

        {/* Full Editorial Content (Compact & Focused Width) */}
        <PrivacyPolicyContent isModal />
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
