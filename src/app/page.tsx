import { Navbar } from "@/components/layouts/navbar";
import { SectionLayout } from "@/components/layouts/section-layout";
import { CardProduct } from "@/components/ui/card-product";
import { FooterLink } from "@/components/ui/link";
import { products } from "@/mocks/products";
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
          {products.map((product) => (
            <CardProduct key={product.id} {...product} />
          ))}
        </div>
      </section>
      <SectionLayout
        title="Hero Section"
        image="/images/image-section-1.jpg"
        alt="image-section-1"
        isLeft={true}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio facere
        est commodi cumque, illum sit eveniet, fugit quam doloribus debitis,
        iure vel laboriosam corporis earum minima? Non facilis a modi expedita
        impedit enim doloribus quaerat iure minima iste vitae laudantium
        voluptates consequuntur aliquid, commodi deserunt quod odit atque nihil
        ipsa veritatis! Tempora iusto amet repellat iste neque, quod
        voluptatibus inventore nulla saepe pariatur animi hic harum sed
        reiciendis ullam aperiam perferendis aut vel quibusdam numquam
        repellendus nostrum architecto in. Illum corporis maiores, inventore in
        quisquam illo autem qui veritatis aliquam cum voluptatum alias, ipsum
        repudiandae quam voluptatibus repellat. Corporis, ea.
      </SectionLayout>
      <SectionLayout
        title="Show Off Your Personality With a Custom Case"
        image="/images/product-3.jpeg"
        alt="image-section-2"
        isLeft={false}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ratione
        soluta, modi odit debitis ut a ipsa qui accusantium nulla vel reiciendis
        eaque eum, harum at obcaecati ex quas. Quae non recusandae possimus ab,
        similique cum corporis consequatur totam laudantium ratione aliquam
        velit unde minima earum, laboriosam nemo ullam soluta eius illo nostrum!
        Ut autem fugiat sit delectus suscipit nemo odit quis similique ratione,
        sint provident, nostrum recusandae earum reprehenderit!
      </SectionLayout>
      <section></section>
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
