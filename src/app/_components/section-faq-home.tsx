"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export const SectionFaqHome = () => {
  const tHome = useTranslations("home");
  const tFaq = useTranslations("faq");

  const homeFaqs = [
    {
      id: "item-1",
      question: tFaq("items.custom2_q"),
      answer: tFaq("items.custom2_a"),
    },
    {
      id: "item-2",
      question: tFaq("items.custom3_q"),
      answer: tFaq("items.custom3_a"),
    },
    {
      id: "item-3",
      question: tFaq("items.warranty1_q"),
      answer: tFaq("items.warranty1_a"),
    },
    {
      id: "item-4",
      question: tFaq("items.custom1_q"),
      answer: tFaq("items.custom1_a"),
    },
    {
      id: "item-5",
      question: tFaq("items.payment1_q"),
      answer: tFaq("items.payment1_a"),
    },
    {
      id: "item-6",
      question: tFaq("items.shipping1_q"),
      answer: tFaq("items.shipping1_a"),
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-20 font-[family-name:var(--font-fustat)] select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Header & Action Link */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 md:space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase leading-[1.1] font-[family-name:var(--font-fustat)]">
              {tHome("faqHeader1")}
              <br />
              <span className="font-extrabold text-neutral-900">
                {tHome("faqHeader2")}
              </span>
            </h2>
          </div>

          <div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-foreground/80 hover:text-primary transition-colors group cursor-pointer"
            >
              <span>{tHome("viewAllFaq")}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Sleek Accordion with Solid Black, Compact Plus (+) to Minus (-) Icon */}
        <div className="lg:col-span-7">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full"
          >
            {homeFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-border/40 py-0.5"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-3.5 text-left text-sm md:text-base font-semibold text-foreground transition-all hover:no-underline group">
                    <span className="pr-4">{faq.question}</span>

                    {/* Solid Black, Compact Animated Plus (+) to Minus (-) Icon */}
                    <div className="relative w-3.5 h-3.5 shrink-0 text-foreground flex items-center justify-center transition-transform duration-300 ease-out group-data-[state=open]:rotate-180">
                      {/* Horizontal bar (Solid black, slightly smaller) */}
                      <span className="absolute w-3 h-[1.75px] bg-foreground rounded-full transition-transform duration-300 ease-out" />
                      {/* Vertical bar (Solid black, slightly smaller, collapses to 0) */}
                      <span className="absolute w-[1.75px] h-3 bg-foreground rounded-full transition-all duration-300 ease-out group-data-[state=open]:scale-y-0 group-data-[state=open]:opacity-0" />
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>

                <AccordionContent className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed pt-0 pb-3 font-normal">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default SectionFaqHome;
