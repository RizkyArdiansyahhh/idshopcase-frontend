"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const homeFaqs = [
  {
    id: "item-1",
    question: "Berapa lama proses pembuatan Custom Case (PO)?",
    answer:
      "Proses pembuatan dan cetak kustom memerlukan waktu 3-7 hari kerja sebelum produk dikirimkan ke alamat Anda.",
  },
  {
    id: "item-2",
    question: "Tipe HP apa saja yang tersedia di Idshopcase?",
    answer:
      "Kami mendukung lebih dari 500+ tipe HP dari berbagai merek ternama seperti iPhone, Samsung, Xiaomi, Poco, Oppo, Vivo, Realme, dan Infinix.",
  },
  {
    id: "item-3",
    question: "Bagaimana jika casing yang diterima salah tipe atau rusak?",
    answer:
      "Kami memberikan Garansi 100% Retur / Cetak Ulang Gratis apabila terdapat kesalahan tipe HP atau kerusakan fisik dari pihak kami.",
  },
  {
    id: "item-4",
    question: "Bagaimana cara mengirimkan desain foto milik sendiri?",
    answer:
      "Anda dapat langsung mengunggah foto favorit Anda melalui tombol pilihan custom saat melakukan pemesanan produk di website kami.",
  },
];

export const SectionFaqHome = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Header & Action Link (Slimmer & Clean typography) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 md:space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.2]">
              Any questions?
              <br />
              <span className="font-bold text-foreground">We got you.</span>
            </h2>
          </div>

          <div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-foreground/80 hover:text-primary transition-colors group cursor-pointer"
            >
              <span>Lihat Semua FAQ</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Sleek & Clean Accordion */}
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {homeFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-border/40 py-0.5"
              >
                <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground/90 hover:no-underline py-3.5">
                  {faq.question}
                </AccordionTrigger>
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
