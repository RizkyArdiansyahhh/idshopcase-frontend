"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: 0,
    title: "Cepat",
    desc: "Aplikasi super cepat",
    image: "/images/product-1.jpeg",
  },
  {
    id: 1,
    title: "Aman",
    desc: "Keamanan terjamin",
    image: "/images/product-2.jpeg",
  },
  {
    id: 2,
    title: "Mudah",
    desc: "User friendly",
    image: "/images/product-3.jpeg",
  },
];

export const StickyScrollHomePage = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActive(index);
          }
        });
      },
      { threshold: 0.6 },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-40">
      <div className="mx-auto grid w-[80vw] grid-cols-2 gap-16">
        <div className="space-y-40">
          {SECTIONS.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className="min-h-[70vh]"
            >
              <h2 className="text-4xl font-bold">{item.title}</h2>
              <p className="mt-4 text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="sticky top-32 z-30 h-[80vh] rounded-xs overflow-hidden">
            <Image
              key={active}
              src={SECTIONS[active].image}
              alt="feature"
              fill
              className="object-cover object-center transition-opacity duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
