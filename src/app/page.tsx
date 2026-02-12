import { Navbar } from "@/components/layouts/navbar";
import Image from "next/image";
import { SectionHero } from "./_components/section-hero";
import { SectionShowCase } from "./_components/section-show-case";
import { Footer } from "./_components/footer";

import {
  CardTestimoni,
  CardTestimoniSpeaker,
} from "@/components/shared/card-testimoni";
import { ListProductsHomePage } from "@/features/products/components/list-products";
import GradientFillButton from "@/components/shared/gradient-fill-button";
import { BannerVideoHomePage } from "./_components/baner-video-home-page";
import { Separator } from "@/components/ui/separator";
import { SectionModelTampilan } from "./_components/section-model-tampilan";
import { CarouselHomePage } from "./_components/carousel-homepage";
import { StickyScrollHomePage } from "./_components/sticky-scroll-homepage";
import { SectionCategories } from "./_components/section-categories";
import { WhatsAppWidget } from "@/components/shared/whatsapp-widget";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar isBlur={true} />
      <CarouselHomePage></CarouselHomePage>
      <div className="my-20"></div>
      <div className="w-full  flex justify-end">
        <div className="px-10 flex flex-col gap-4 py-6 ">
          <h1 className="text-5xl font-bold w-4/5 leading-16">
            Produk Unggulan{" "}
            <span className="text-foreground/40 text-6xl">Idshopcase</span>.
          </h1>
          <div className="flex flex-col gap-5">
            <p className="w-2/3 font-semibold text-base text-foreground/60">
              Koleksi produk unggulan Idshopcase yang dipilih berdasarkan
              kualitas dan kebutuhan pengguna.
            </p>
            <GradientFillButton></GradientFillButton>
          </div>
        </div>
        <div className="w-2/3 py-6  overflow-hidden">
          <ListProductsHomePage></ListProductsHomePage>
        </div>
      </div>
      <div className="h-[80vh] w-screen flex items-center px-5">
        <BannerVideoHomePage></BannerVideoHomePage>
      </div>
      <div className="w-full h-fit py-4 px-4 flex flex-row gap-4"></div>
      {/* <SectionProducts /> */}
      <SectionHero />
      <div className="h-[70vh] w-screen flex justify-center items-end pb-10">
        <SectionCategories></SectionCategories>
      </div>
      <StickyScrollHomePage></StickyScrollHomePage>
      <SectionShowCase />
      <Separator className="mt-10"></Separator>
      <div className="w-screen h-fit bg-muted-foreground/5 py-2">
        <SectionModelTampilan></SectionModelTampilan>
      </div>
      <Separator className="mb-10"></Separator>
      <section className="container my-16 px-10 hidden lg:block">
        <div className="w-full flex justify-center items-center ">
          <h1 className="text-3xl w-1/2 font-semibold text-center text-foreground mb-5">
            apa Kata Mereka Tentang Kami?
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-10 w-full h-[90vh] mb-10 ">
          <div className="h-full w-full flex-col gap-5">
            <CardTestimoniSpeaker
              imageProfileUrl="1"
              image="/images/testimoni/speak-1.jpg"
            ></CardTestimoniSpeaker>
            <CardTestimoni imageProfileUrl="2" isDark={false}>
              Desain case ponselmu sendiri dengan IdShopCase! Unggah hingga 3
              gambar favoritmu, pilih warna case, dan atur posisi desain sesuai
              keinginanmu. Buat case unik yang mencerminkan gaya dan
              kreativitasmu.
            </CardTestimoni>
            <CardTestimoni imageProfileUrl="3" isDark={true}>
              Unggah gambar dan desain case unikmu sendiri di IdShopCase.
              Kreatif dan personal!
            </CardTestimoni>
          </div>
          <div className="h-full w-full flex-col gap-5">
            <CardTestimoni imageProfileUrl="4" isDark={false}>
              Desain case impianmu sekarang! Pilih gambar, warna, dan atur
              desain sesuai selera. Buat case yang benar-benar mencerminkan gaya
              pribadimu di IdShopCase.
            </CardTestimoni>
            <CardTestimoni imageProfileUrl="5" isDark={true}>
              Ekspresikan kreativitasmu! Gabungkan gambar favoritmu dan buat
              case unik yang mencerminkan gaya pribadi di IdShopCase.
            </CardTestimoni>
            <CardTestimoniSpeaker
              imageProfileUrl="8"
              image="/images/testimoni/speak-2.jpg"
            ></CardTestimoniSpeaker>
          </div>
          <div className="h-full w-full">
            <CardTestimoni imageProfileUrl="6" isDark={true}>
              Custom Case IdShopCase memungkinkanmu memilih warna, menambahkan
              hingga 3 gambar, dan menyesuaikan posisi desain. Hasilnya case
              keren yang sesuai keinginanmu!
            </CardTestimoni>
            <CardTestimoniSpeaker
              imageProfileUrl="9"
              image="/images/testimoni/speak-3.jpg"
            ></CardTestimoniSpeaker>
            <CardTestimoni imageProfileUrl="7" isDark={false}>
              Buat case yang unik dan personal di IdShopCase! Unggah gambar
              favoritmu dan pilih warna sesuai gaya.
            </CardTestimoni>
          </div>
        </div>
      </section>
      {/* <TestimoniMobile></TestimoniMobile> */}
      <Footer></Footer>
      <WhatsAppWidget />
    </div>
  );
}
