"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger2,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Pemesanan & Custom Case",
    items: [
      {
        id: "custom-1",
        question: "Bagaimana cara melakukan pemesanan Custom Case?",
        answer:
          "Pilih produk Custom Case di katalog, klik tombol 'Custom Sekarang', upload gambar favorit Anda, sesuaikan posisi foto, dan ikuti langkah checkout hingga pembayaran selesai.",
      },
      {
        id: "custom-2",
        question: "Berapa lama estimasi proses pembuatan (Pre-Order)?",
        answer:
          "Proses cetak HD dan Quality Control memerlukan waktu 3-7 hari kerja tergantung jumlah antrean pesanan.",
      },
      {
        id: "custom-3",
        question: "Tipe HP apa saja yang tersedia?",
        answer:
          "Kami mendukung lebih dari 500+ tipe HP dari brand iPhone, Samsung, Xiaomi, Poco, Oppo, Vivo, Realme, dan Infinix. Jika tipe HP Anda tidak tercantum, hubungi Customer Service kami.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        id: "shipping-1",
        question: "Kapan pesanan akan dikirim?",
        answer:
          "Pesanan akan dikirimkan segera setelah proses produksi pre-order selesai (3-7 hari kerja) melalui ekspedisi yang Anda pilih saat checkout.",
      },
      {
        id: "shipping-2",
        question: "Berapa ongkirnya?",
        answer:
          "Ongkos kirim dihitung secara otomatis berdasarkan lokasi tujuan dan ekspedisi pengiriman saat Anda melakukan checkout.",
      },
      {
        id: "shipping-3",
        question: "Bisakah pengiriman overseas / luar negeri?",
        answer:
          "Saat ini kami melayani pengiriman ke seluruh pelosok Indonesia. Untuk pengiriman mancanegara, harap hubungi Customer Service kami terlebih dahulu.",
      },
    ],
  },
  {
    category: "Garansi & Retur",
    items: [
      {
        id: "guarantee-1",
        question: "Apakah ada garansi jika casing yang diterima salah tipe atau rusak?",
        answer:
          "Ya! Kami memberikan Garansi 100% Retur atau Cetak Ulang Gratis apabila terdapat kesalahan cetak/tipe HP dari pihak kami atau barang rusak saat pengiriman.",
      },
      {
        id: "guarantee-2",
        question: "Bagaimana cara mengklaim garansi?",
        answer:
          "Kirimkan video unboxing tanpa terputus dan foto barang yang diterima ke WhatsApp Customer Service kami dalam waktu maksimal 2x24 jam setelah barang diterima.",
      },
    ],
  },
  {
    category: "Pembayaran",
    items: [
      {
        id: "payment-1",
        question: "Metode pembayaran apa saja yang tersedia?",
        answer:
          "Kami menerima pembayaran via Transfer Bank (BCA, Mandiri, BRI, BNI), QRIS, E-Wallet (ShopeePay, Dana, OVO, GoPay), serta Indomaret & Alfamart.",
      },
    ],
  },
];

export default function FAQPage() {
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
            FAQs
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
