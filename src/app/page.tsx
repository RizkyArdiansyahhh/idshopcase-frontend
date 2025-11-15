import { Navbar } from "@/components/layouts/navbar";
import Image from "next/image";
import { SectionProducts } from "./_components/section-products";
import { SectionHero } from "./_components/section-hero";
import { SectionShowCase } from "./_components/section-show-case";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
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
      <Footer></Footer>
    </div>
  );
}
