"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const SectionCategories = () => {
  const t = useTranslations("home");

  const categories = [
    {
      id: 0,
      title: t("categoryCustomCase"),
      img: "/images/main-assets/category-1.jpg",
    },
    {
      id: 1,
      title: t("categoryPopSocket"),
      img: "/images/main-assets/category-2.jpg",
    },
    {
      id: 2,
      title: t("categoryKeychain"),
      img: "/images/main-assets/category-3.jpg",
    },
    {
      id: 3,
      title: t("categoryPhoneCharm"),
      img: "/images/main-assets/category-4.jpg",
    },
  ];

  return (
    <>
      <div className="h-[46vh] w-screen grid grid-cols-4 gap-2 px-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="h-full rounded-xs overflow-hidden relative group cursor-pointer"
          >
            <motion.div
              initial={{ scale: 1.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={category.img}
                alt={category.title}
                fill
                className="object-cover object-center grayscale-25 contrast-110 saturate-100 brightness-95 hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-100 group-hover:brightness-110"
              />
            </motion.div>

            <div
              className="
        pointer-events-none
        absolute inset-0
        z-10
        bg-[url('/images/noise-effect.png')]
        bg-repeat
        group-hover:bg-none
        group-hover:bg-no-repeat
        "
            />

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <p
                className="
          text-4xl font-black uppercase text-white
          drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]
          "
              >
                {category.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
