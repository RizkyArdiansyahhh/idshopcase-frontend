import Image from "next/image";
import { Button } from "../ui/button";

type SectionLayoutPropsType = {
  children: string;
  title: string;
  image: string;
  alt: string;
  isLeft: boolean;
};

export const SectionLayout = (props: SectionLayoutPropsType) => {
  const { children, title, image, alt, isLeft } = props;
  return (
    <section className="h-[70vh] lg:h-screen w-screen py-6 px-5 md:px-10 lg:px-16">
      <div
        className="
         relative bg-foreground h-full rounded-2xl overflow-hidden"
      >
        <div
          className={`${
            isLeft ? "w-full" : "w-full md:w-[40%]"
          } h-full relative `}
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-center"
          />
        </div>

        <div
          className={`${
            isLeft
              ? "left-0  w-full lg:left-0 lg:w-[55%] h-fit top-0"
              : "bottom-0  w-full h-fit md:right-0 md:w-[60%] md:h-full md:top-0"
          } absolute   lg:h-full bg-black/[62%] backdrop-blur-lg rounded-2xl py-5 lg:py-10 px-5 lg:px-10 flex flex-col justify-between`}
        >
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-white font-black my-4 lg:my-7">
              {title}
            </h2>
            <p className="font-garamond text-white text-md md:text-xl lg:text-2xl h-[90%] lg:w-[90%]">
              {children}
            </p>
          </div>

          {!isLeft && (
            <div className="flex justify-end">
              <Button
                className="text-lg md:text-xl lg:text-2xl"
                variant="outline"
                size="lg"
              >
                Custom Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
