"use client";

import { getCurrentStep } from "@/utils/get-current-steps";
import { usePathname, useRouter } from "next/navigation";
import { Stepper } from "./components/stepper";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = getCurrentStep(pathname);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="w-full px-5">
        <div className="flex flex-row gap-2 items-center py-4">
          <Link href="/">
            <ChevronLeft />
          </Link>
          <span className="text-base text-foreground font-medium">
            Detail Order
          </span>
        </div>
      </div>
      {/* STEP HEADER */}
      <div className="shrink-0 pt-1  bg-background">
        <div className="w-11/12 md:w-2/3 mx-auto pb-3">
          <Stepper currentStep={currentStep} />
        </div>
        <Separator></Separator>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto bg-foreground/5">{children}</div>
    </div>
  );
}
