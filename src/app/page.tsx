import { Navbar } from "@/components/layouts/navbar";
import Image from "next/image";
import { SectionProducts } from "./_components/section-products";
import { SectionHero } from "./_components/section-hero";
import { SectionShowCase } from "./_components/section-show-case";
import { Footer } from "./_components/footer";
import { FaPlay } from "react-icons/fa";

import {
  CardTestimoni,
  CardTestimoniSpeaker,
} from "@/components/shared/card-testimoni";

export default function Home() {
  return (
    // <ProtectedRoute allowedRoles={["customer"]} redirectTo="/login">
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
      <section className="container my-16 px-10">
        <div className="w-full flex justify-center items-center ">
          <h1 className="text-3xl w-1/2 font-semibold text-center text-foreground mb-5">
            apa Kata Mereka Tentang Kami?
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-10 w-full h-[90vh] mb-10 ">
          <div className="h-full w-full  flex-col gap-5">
            <CardTestimoniSpeaker
              imageProfileUrl="1"
              image="/images/testimoni/speak-1.jpg"
            ></CardTestimoniSpeaker>
            <CardTestimoni imageProfileUrl="2" isDark={false}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
              ratione cupiditate accusantium, incidunt voluptas sunt
              repellendus? Praesentium, dolorum voluptatum! Saepe voluptatibus
              enim voluptates sed perferendis, corrupti ipsam eaque adipisci
              quae!
            </CardTestimoni>
            <CardTestimoni imageProfileUrl="3" isDark={true}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed animi
              magni tempore cumque eveniet eligendi harum officia aspernatur
              fugit. Perferendis!
            </CardTestimoni>
          </div>
          <div className="h-full w-full flex-col gap-5">
            <CardTestimoni imageProfileUrl="4" isDark={false}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              quas id non earum ipsum laboriosam!
            </CardTestimoni>
            <CardTestimoni imageProfileUrl="5" isDark={true}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              amet quasi numquam id facere aliquam modi. Esse hic ratione
              doloremque.
            </CardTestimoni>
            <CardTestimoniSpeaker
              imageProfileUrl="8"
              image="/images/testimoni/speak-2.jpg"
            ></CardTestimoniSpeaker>
          </div>
          <div className="h-full w-full">
            <CardTestimoni imageProfileUrl="6" isDark={true}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              libero, deserunt adipisci, porro iste accusamus ab voluptatum,
              veritatis error temporibus aliquid qui amet ut perferendis facere
              quo minus animi saepe!
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
      <Footer></Footer>
    </div>
    // </ProtectedRoute>
  );
}
