import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami | IDSHOPCASE",
  description:
    "Mengenal IDSHOPCASE — Penyedia custom case HP premium dan aksesoris berkualitas sejak 2019.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-20 pb-16">
      {/* Hero Banner Section */}
      <section className="relative w-full py-20 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/banner-collection.jpeg"
            alt="IDSHOPCASE Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-background/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase text-background">
            Sejak 2019
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-background">
            Ekspresikan Dirimu Lewat Case
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-background/80 font-normal">
            IDSHOPCASE hadir untuk melengkapi gaya ponselmu dengan casing kustom berkualitas tinggi, keychain aesthetic, dan aksesoris yang dibuat dengan penuh dedikasi.
          </p>
        </div>
      </section>

      {/* Main Story & Brand Philosophy */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Perjalanan Kami Memulai Karya
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Dimulai pada tahun <strong className="text-foreground">2019</strong>, IDSHOPCASE lahir dari ide sederhana: setiap pengguna smartphone berhak memiliki casing HP yang unik, tahan lama, dan mencerminkan karakter diri mereka.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Dari pesanan rumahan skala kecil, kini IDSHOPCASE telah tumbuh menjadi brand kepercayaan puluhan ribu pelanggan di seluruh Indonesia, menyediakan berbagai pilihan kustomisasi casing mulai dari Clear Case, Impact Case, Magsafe, hingga Keychain & Phone Charm cantik.
            </p>
            <div className="pt-2">
              <Link
                href="/products/collections"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-transform duration-200 hover:scale-105"
              >
                Jelajahi Koleksi Produk <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-border">
            <Image
              src="/images/main-assets/banner1.jpg"
              alt="IDSHOPCASE Craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8 pt-8 border-t border-border">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Mengapa Memilih IDSHOPCASE?</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Komitmen kami terhadap kualitas dan kepuasan pelanggan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                <Award className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Pengalaman Sejak 2019</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Telah berpengalaman lebih dari 5 tahun dalam dunia kustomisasi casing HP dan aksesoris.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Desain Aesthetic</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Pilihan desain modern, elegan, dan bisa dikustomisasi sesuai foto atau kreasi favoritmu.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Bahan Presisi & Protektif</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Material pilihan yang melindungi smartphone dari benturan dengan presisi tombol maksimal.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Layanan Ramah & Cepat</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Tim CS kami selalu siap membantu pertanyaan dan koordinasi cetak custom case kamu.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-foreground text-background p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-background">
            Siap Membuat Case Kustom Impianmu?
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-background/80">
            Pilih jenis casing favoritmu dan tambahkan sentuhan personalmu sekarang.
          </p>
          <div className="pt-2">
            <Link
              href="/products/collections"
              className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-background/90 transition-all duration-200"
            >
              Lihat Katalog Produk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
