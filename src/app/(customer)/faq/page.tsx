"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger2,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function FAQPage() {
  const t = useTranslations("faq");

  const faqCategories = [
    {
      category: t("categories.orderCustom"),
      items: [
        {
          id: "custom-1",
          question: t("items.custom1_q"),
          answer: t("items.custom1_a"),
        },
        {
          id: "custom-2",
          question: t("items.custom2_q"),
          answer: t("items.custom2_a"),
        },
        {
          id: "custom-3",
          question: t("items.custom3_q"),
          answer: t("items.custom3_a"),
        },
      ],
    },
    {
      category: t("categories.shipping"),
      items: [
        {
          id: "shipping-1",
          question: t("items.shipping1_q"),
          answer: t("items.shipping1_a"),
        },
        {
          id: "shipping-2",
          question: t("items.shipping2_q"),
          answer: t("items.shipping2_a"),
        },
        {
          id: "shipping-3",
          question: t("items.shipping3_q"),
          answer: t("items.shipping3_a"),
        },
      ],
    },
    {
      category: t("categories.warranty"),
      items: [
        {
          id: "guarantee-1",
          question: t("items.warranty1_q"),
          answer: t("items.warranty1_a"),
        },
        {
          id: "guarantee-2",
          question: t("items.warranty2_q"),
          answer: t("items.warranty2_a"),
        },
      ],
    },
    {
      category: t("categories.payment"),
      items: [
        {
          id: "payment-1",
          question: t("items.payment1_q"),
          answer: t("items.payment1_a"),
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground w-full">
      {/* Hero Banner Area (THENBLANK Style) */}
      <div className="w-full h-[35vh] md:h-[42vh] relative flex items-center justify-center overflow-hidden">
        <Image
          src="/images/banner-collection.jpeg"
          fill
          alt="FAQs Banner"
          className="object-cover object-center brightness-60"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white drop-shadow-md">
            {t("title")}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 md:py-24 w-full space-y-14">
        {faqCategories.map((section, idx) => (
          <div key={idx} className="space-y-4">
            {/* Category Title (No Icon, clean typography) */}
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              {section.category}
            </h2>

            {/* Clean Accordion List */}
            <Accordion type="single" collapsible className="w-full">
              {section.items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-border/40"
                >
                  <AccordionTrigger2 className="text-sm md:text-base font-semibold text-foreground/90 hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger2>
                  <AccordionContent className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed pt-0 pb-4 font-normal">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </main>
    </div>
  );
}
