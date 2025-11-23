import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SectionShowCase = () => {
  return (
    <>
      <section className="h-screen w-screen py-6 flex flex-col lg:flex-row gap-3 px-5 md:px-10 lg:px-16">
        <div className="w-full lg:w-2/6 h-full bg-white rounded-2xl overflow-hidden  border-2">
          <div className="w-full h-fit lg:h-1/2 flex flex-col justify-between px-3 pt-4 lg:pt-8 pb-3">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black my-5">
                Hero Section
              </h2>
              <p className="text-foreground font-garamond text-lg lg:text-xl w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                autem! Officia culpa praesentium delectus atque. Est minima
                iusto vero quidem!
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                variant={"outline"}
                size={"lg"}
                className="bg-gradient-to-r from-muted-foreground to-foreground px-10 text-lg text-background md:text-xl font-semibold"
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
        <div className="relative w-full lg:w-4/6 h-full rounded-2xl overflow-hidden">
          <Image
            src={"/images/product-1.jpeg"}
            alt="Image-Section-3"
            fill
            className="object-cover"
          ></Image>
          <div className="top-0 right-0 absolute h-full w-1/2 bg-black/[76%] backdrop-blur-lg rounded-2xl flex flex-col justify-between px-5 pt-8 pb-5">
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black my-5">
                Hero Section
              </h2>
              <p className="font-garamond hidden md:block text-md lg:text-xl w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                est sunt adipisci amet praesentium nostrum tenetur voluptatem
                inventore dolore corrupti velit similique ipsa, dicta illum
                facere distinctio ut dolorem, quidem temporibus voluptatibus
                accusantium laudantium veniam deserunt? Explicabo recusandae
                laborum fugit quo error, ut cum soluta aspernatur provident,
                optio mollitia ipsa.
              </p>
              <p className="font-garamond block md:hidden text-md w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                est sunt adipisci amet praesentium nostrum tenetur voluptatem
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                size={"lg"}
                variant={"outline"}
                className="px-1 md:px-5 lg:px-10 text-lg md:text-xl font-semibold"
              >
                Custom Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen w-screen py-6 px-5 md:px-10 lg:px-16 flex flex-col  lg:flex-row gap-3">
        <div className="w-full lg:w-[30%] h-full rounded-2xl overflow-hidden  ">
          <div className="relative w-full h-full ">
            <Image
              src={"/images/product-4.jpeg"}
              alt="Image-Section-4"
              fill
              className="object-cover"
            ></Image>
            <div className="absolute bottom-0 bg-black/75 backdrop-blur-lg left-0 w-full h-2/5 flex flex-col justify-between px-5 pt-2 pb-5">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black my-5">
                  Make Your Own Keychain
                </h2>
                <p className="font-garamond text-xl w-[90%] hidden lg:block">
                  Buat gantungan kunci versi kamu sendiri—unik, personal, dan
                  penuh cerita.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="px-2 md:px-5 lg:px-10 text-xl md:text-xl font-semibold"
                >
                  Custom Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[70%] h-full rounded-2xl overflow-hidden">
          <div className="relative w-full h-full ">
            <Image
              src={"/images/image-section-4-1.jpeg"}
              alt="Image-Section-4"
              fill
              className="object-cover"
            ></Image>
            <div className="absolute bottom-0 bg-black/75 backdrop-blur-lg left-0 w-full h-1/3 flex flex-col justify-between px-5 pt-2 pb-5">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black my-5">
                  Create Your Creative Popsocket
                </h2>
                <p className="font-garamond text-xl w-[90%] hidden lg:block">
                  Ciptakan popsocket unik yang mencerminkan dirimu. Clean,
                  personal, dan dibuat khusus untuk melengkapi gaya ponselmu
                  yang bikin HP-mu makin standout dan personal.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="px-2 md:px-5 lg:px-10 text-lg md:text-xl  font-semibold bg-white text-foreground"
                >
                  Custom Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
