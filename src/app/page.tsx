import { Navbar } from "@/components/layouts/navbar";
import { CardProduct } from "@/components/ui/card-product";
import { FooterLink } from "@/components/ui/link";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="relative h-[80vh] w-screen ">
        <Image
          src={"/images/hero-section.jpeg"}
          fill
          alt="hero-section-image"
          className="object-cover object-top"
        />
      </div>
      <section className="h-[85vh] w-screen flex flex-col justify-center">
        <h1 className="font-black text-3xl mb-20 text-center">
          IDSHOP Customization
        </h1>
        <div className="w-full px-10 grid grid-cols-4 justify-items-center">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </section>
      <section className="h-screen w-screen py-6 px-16">
        <div className="relative bg-amber-200 w-full h-full rounded-2xl overflow-hidden">
          <Image
            src={"/images/image-section-1.jpg"}
            alt="image-section-1"
            fill
            className="object-cover object-center"
          />
          <div className="absolute top-0 left-0 w-[55%] h-full bg-black/[62%] backdrop-blur-lg rounded-2xl py-10 px-10">
            <h2 className="text-4xl font-heading text-white font-black my-7">
              Hero Section
            </h2>
            <p className="font-garamond text-white text-2xl w-[90%]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              iusto quasi amet eius ipsum possimus eos eligendi totam ad
              deserunt. Esse, natus quas deleniti cum mollitia corrupti iusto
              facilis nam aperiam quod ipsum voluptate error nostrum. Neque
              ullam praesentium quidem repellendus, rem architecto voluptates
              impedit consequatur beatae nostrum reprehenderit. Laboriosam et
              fugiat vero hic distinctio rem nisi veniam laudantium ullam vel,
              laborum fugit consequuntur error quam aut sapiente dolor dicta
              maiores voluptatibus earum, alias ratione. Animi necessitatibus
              exercitationem dolorum neque qui nostrum. Perferendis quibusdam
              perspiciatis id, ipsum quia corporis officiis natus voluptatem,
              numquam rerum, qui expedita. Corporis maxime illum labore.
            </p>
          </div>
        </div>
      </section>
      <footer className="w-screen h-[75vh] bg-foreground">
        <div className="h-full flex items-center pb-36 px-20">
          <div className="w-1/4 text-white flex flex-col gap-4">
            <h2 className="font-bold text-4xl">IDshop</h2>
            <ul>
              <FooterLink href="/">Beranda</FooterLink>
              <FooterLink href="/">Custom Case</FooterLink>
              <FooterLink href="/">Tentang Kami</FooterLink>
            </ul>
          </div>
          <div className="w-1/4 text-white flex flex-col gap-4">
            <h2 className="font-bold text-4xl">Hubungi Kami</h2>
            <ul>
              <FooterLink href="/">Email: support@idshop.com</FooterLink>
              <FooterLink href="/">WhatsApp: 0812-3456-7890</FooterLink>
              <FooterLink href="/">Instagram: @idshop.official</FooterLink>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
