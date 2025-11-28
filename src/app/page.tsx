import { Navbar } from "@/components/layouts/navbar";
import Image from "next/image";
import { SectionProducts } from "./_components/section-products";
import { SectionHero } from "./_components/section-hero";
import { SectionShowCase } from "./_components/section-show-case";
import { Footer } from "./_components/footer";

import {
  CardTestimoni,
  CardTestimoniSpeaker,
} from "@/components/shared/card-testimoni";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { TestimoniMobile } from "./_components/testimoni-mobile";

export default function Home() {
  return (
    <ProtectedRoute allowedRoles={["customer"]} redirectTo="/admin/dashboard">
      <div className="flex flex-col items-center">
        <Navbar isBlur={true} />
        <div className="relative h-[80vh] w-screen ">
          <Image
            src={"/images/hero-section.jpeg"}
            fill
            alt="hero-section-image"
            className="object-cover object-top"
          />
          {/* <div className="font-snell text-white absolute text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p>Welcome Idshop</p>
          <p>Case Phone</p>
        </div> */}
        </div>
        <SectionProducts />
        <SectionHero />
        <SectionShowCase />
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
                gambar favoritmu, pilih warna case, dan atur posisi desain
                sesuai keinginanmu. Buat case unik yang mencerminkan gaya dan
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
                desain sesuai selera. Buat case yang benar-benar mencerminkan
                gaya pribadimu di IdShopCase.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                earum aliquid, fugit aliquam architecto provident est odio iure
                nihil assumenda nulla dolore corporis maxime molestiae sequi.
                Officia distinctio rem libero.
              </CardTestimoni>
            </div>
          </div>
        </section>
        {/* <TestimoniMobile></TestimoniMobile> */}

        <Footer></Footer>
      </div>
      {/* //{" "} */}
    </ProtectedRoute>
  );
}
