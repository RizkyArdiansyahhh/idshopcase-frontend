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
    <section className="h-screen w-screen py-6 px-16">
      <div
        className="
         relative bg-foreground h-full rounded-2xl overflow-hidden"
      >
        <div className={`${isLeft ? "w-full" : "w-[40%]"} h-full relative `}>
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-center"
          />
        </div>

        <div
          className={`${
            isLeft ? "left-0 w-[55%]" : "right-0 w-[60%]"
          } absolute top-0 h-full bg-black/[62%] backdrop-blur-lg rounded-2xl py-10 px-10 flex flex-col justify-between`}
        >
          <div>
            <h2 className="text-4xl font-heading text-white font-black my-7">
              {title}
            </h2>
            <p className="font-garamond text-white text-2xl w-[90%]">
              {children}
            </p>
          </div>

          {!isLeft && (
            <div className="flex justify-end">
              <Button className="text-2xl" variant="outline" size="xl">
                Custom Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
