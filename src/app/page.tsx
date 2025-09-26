import { Navbar } from "@/components/layouts/navbar";
import { SectionLayout } from "@/components/layouts/section-layout";
import { Button } from "@/components/ui/button";
import { CardProduct } from "@/components/ui/card-product";
import { FooterLink } from "@/components/ui/link";
import { products } from "@/mocks/products";
import Image from "next/image";
import Link from "next/link";

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
      <section className="h-screen w-screen py-6 px-16 flex flex-row gap-3">
        <div className="w-2/6 h-full bg-white rounded-2xl overflow-hidden  border-2">
          <div className="w-full h-1/2 flex flex-col justify-between px-3 pt-8 pb-3">
            <div>
              <h2 className="text-4xl font-heading font-black my-5">
                Hero Section
              </h2>
              <p className="text-foreground font-garamond text-2xl w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                autem! Officia culpa praesentium delectus atque. Est minima
                iusto vero quidem!
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                variant={"outline"}
                size={"xl"}
                className="bg-gradient-to-r from-muted-foreground to-foreground px-10 text-2xl font-medium"
              >
                Custom Now
              </Button>
            </div>
          </div>
          <div className="relative w-full h-1/2">
            <Image
              src={"/images/image-section-3-1.jpg"}
              fill
              alt="Image-Section-3"
              className="object-cover object-center"
            ></Image>
          </div>
        </div>
        <div className="relative w-4/6 h-full bg-blue-400 rounded-2xl overflow-hidden">
          <Image
            src={"/images/product-1.jpeg"}
            alt="Image-Section-3"
            fill
            className="object-cover"
          ></Image>
          <div className="top-0 right-0 absolute h-full w-1/2 bg-black/[76%] backdrop-blur-lg rounded-2xl flex flex-col justify-between px-5 pt-8 pb-5">
            <div className="text-white">
              <h2 className="text-4xl font-heading font-black my-5">
                Hero Section
              </h2>
              <p className="font-garamond text-2xl w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                est sunt adipisci amet praesentium nostrum tenetur voluptatem
                inventore dolore corrupti velit similique ipsa, dicta illum
                facere distinctio ut dolorem, quidem temporibus voluptatibus
                accusantium laudantium veniam deserunt? Explicabo recusandae
                laborum fugit quo error, ut cum soluta aspernatur provident,
                optio mollitia ipsa.
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                size={"xl"}
                variant={"outline"}
                className="px-10 text-2xl font-medium"
              >
                Custom Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen w-screen py-6 px-16 flex flex-row gap-3">
        <div className="w-[30%] h-full rounded-2xl overflow-hidden  ">
          <div className="relative w-full h-full ">
            <Image
              src={"/images/product-4.jpeg"}
              alt="Image-Section-4"
              fill
              className="object-cover"
            ></Image>
            <div className="absolute bottom-0 bg-black/75 backdrop-blur-lg left-0 w-full h-2/5 flex flex-col justify-between px-5 pt-2 pb-5">
              <div className="text-white">
                <h2 className="text-4xl font-heading font-black my-5">
                  Make Your Own Keychain
                </h2>
                <p className="font-garamond text-2xl w-[90%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  est sunt adipisci amet praesentium nostrum tenetur voluptatem
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  size={"xl"}
                  variant={"outline"}
                  className="px-10 text-2xl font-medium"
                >
                  Custom Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] h-full rounded-2xl overflow-hidden">
          <div className="relative w-full h-full ">
            <Image
              src={"/images/image-section-4-1.jpeg"}
              alt="Image-Section-4"
              fill
              className="object-cover"
            ></Image>
            <div className="absolute bottom-0 bg-black/75 backdrop-blur-lg left-0 w-full h-1/3 flex flex-col justify-between px-5 pt-2 pb-5">
              <div className="text-white">
                <h2 className="text-4xl font-heading font-black my-5">
                  Create Your Creative Popsocket
                </h2>
                <p className="font-garamond text-2xl w-[90%]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Amet, enim? Debitis earum sapiente enim reiciendis!
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  size={"xl"}
                  variant={"outline"}
                  className="px-10 text-2xl font-medium bg-white text-foreground"
                >
                  Custom Now
                </Button>
              </div>
            </div>
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
