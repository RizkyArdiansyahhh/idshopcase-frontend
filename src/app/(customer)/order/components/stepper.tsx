"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { ORDER_STEPS } from "@/utils/get-current-steps";
import { motion } from "framer-motion";
import { CheckCircle, Square } from "lucide-react";
import React from "react";

type StepperProps = {
  currentStep: number;
};

export function Stepper({ currentStep }: StepperProps) {
  const isMobile = useIsMobile();
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between">
        {ORDER_STEPS.map((step, index) => (
          <React.Fragment key={step.key}>
            {/* STEP BOX */}
            <div className="flex flex-col items-center shrink-0">
              <motion.div
                className={`z-10 flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-lg ${
                  index <= currentStep
                    ? "bg-foreground text-white"
                    : "bg-gray-200 text-gray-400 dark:bg-gray-800"
                }`}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {index < currentStep ? (
                  <CheckCircle size={isMobile ? 14 : 18} />
                ) : (
                  <Square size={isMobile ? 12 : 16} fill="currentColor" />
                )}
              </motion.div>

              <span className="mt-2 text-xs text-center whitespace-nowrap">
                {step.label}
              </span>
            </div>

            {/* LINE BETWEEN STEPS */}
            {index < ORDER_STEPS.length - 1 && (
              <div className="relative flex-grow mx-2">
                {/* INACTIVE LINE (DOTTED) */}
                <div
                  className={`absolute top-1/2 w-full -translate-y-1/2 border-t-2 ${
                    index < currentStep
                      ? "border-transparent"
                      : "border-dashed border-gray-300 dark:border-gray-700"
                  }`}
                />

                {/* ACTIVE LINE (SOLID + ANIMATED) */}
                <motion.div
                  className="absolute top-1/2 h-1 -translate-y-1/2 bg-foreground rounded-full"
                  initial={false}
                  animate={{
                    width: index < currentStep ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
