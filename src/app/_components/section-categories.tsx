"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const SectionCategories = () => {
  const t = useTranslations("home");

  const categories = [
    {
      id: 0,
      title: t("categoryCustomCase"),
      slug: "custom_case",
      img: "/images/main-assets/category-1.jpg",
    },
    {
      id: 1,
      title: t("categoryPopSocket"),
      slug: "pop_socket",
      img: "/images/main-assets/category-2.jpg",
    },
    {
      id: 2,
      title: t("categoryKeychain"),
      slug: "keychain",
      img: "/images/main-assets/category-3.jpg",
    },
    {
      id: 3,
      title: t("categoryPhoneCharm"),
      slug: "phone_charm",
      img: "/images/main-assets/category-4.jpg",
    },
  ];

  return (
    <div className="h-[60vh] md:h-[68vh] w-screen grid grid-cols-2 md:grid-cols-4 gap-2 px-1.5 sm:px-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products/collections?category=${category.slug}`}
          className="h-full rounded-xs overflow-hidden relative group cursor-pointer block"
        >
          <motion.div
            initial={{ scale: 1.5 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={category.img}
              alt={category.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center grayscale-25 contrast-110 saturate-100 brightness-95 hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-100 group-hover:brightness-110 transition-all duration-300"
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

          <div className="absolute inset-0 flex items-center justify-center z-20 px-2 text-center">
            <p
              className="
                text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase text-white
                drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]
              "
            >
              {category.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
