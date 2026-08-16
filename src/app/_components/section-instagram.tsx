"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const instagramPhotos = [
  {
    id: 0,
    images: [
      "/images/katalog-instagram/1.jpg",
      "/images/katalog-instagram/2.jpg",
    ],
  },
  {
    id: 1,
    images: ["/images/katalog-instagram/3.jpg"],
  },
  {
    id: 2,
    images: [
      "/images/katalog-instagram/4.jpg",
      "/images/katalog-instagram/5.jpg",
    ],
  },
  {
    id: 3,
    images: ["/images/katalog-instagram/6.jpg"],
  },
  {
    id: 4,
    images: [
      "/images/katalog-instagram/7.jpg",
      "/images/katalog-instagram/8.jpg",
      "/images/katalog-instagram/9.jpg",
    ],
  },
  {
    id: 5,
    images: [
      "/images/katalog-instagram/10.jpg",
      "/images/katalog-instagram/11.jpg",
    ],
  },
  {
    id: 6,
    images: ["/images/katalog-instagram/12.jpg"],
  },
];

export const SectionInstagram = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const progress = Math.min(Math.max((scrollLeft / maxScroll) * 100, 0), 100);
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Scrollable Gallery without default browser scrollbars */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-screen h-[55vh] md:h-[60vh] flex gap-1.5 overflow-x-auto select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 sm:px-4 cursor-grab active:cursor-grabbing"
      >
        <div className="flex-shrink-0 w-3/4 sm:w-1/2 md:w-1/3 h-full flex flex-col gap-1.5">
          {instagramPhotos[0].images.map((image, index) => (
            <div key={index} className="w-full h-1/2 relative overflow-hidden">
              <Image
                src={image}
                alt="Instagram Photo"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 75vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="w-3/4 sm:w-1/2 md:w-1/3 shrink-0 h-full relative overflow-hidden">
          <Image
            src={instagramPhotos[1].images[0]}
            alt="Instagram Photo"
            fill
            sizes="(max-width: 768px) 75vw, 33vw"
            className="object-center object-cover"
          />
        </div>

        <div className="w-3/4 sm:w-1/2 md:w-1/3 shrink-0 h-full flex gap-1.5">
          {instagramPhotos[2].images.map((image, index) => (
            <div key={index} className="w-1/2 h-full relative overflow-hidden">
              <Image
                src={image}
                alt="Instagram Photo"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 38vw, 17vw"
              />
            </div>
          ))}
        </div>

        <div className="w-3/4 sm:w-1/2 md:w-1/3 shrink-0 h-full flex flex-wrap gap-1.5">
          {instagramPhotos[4].images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${
                index === 2 ? "w-full h-[calc(50%-0.375rem)]" : "w-[calc(50%-0.375rem)] h-[calc(50%-0.375rem)]"
              }`}
            >
              <Image
                src={image}
                alt="Instagram Photo"
                fill
                sizes="(max-width: 768px) 75vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div className="w-3/4 sm:w-1/2 md:w-1/3 shrink-0 h-full relative overflow-hidden">
          <Image
            src={instagramPhotos[3].images[0]}
            alt="Instagram Photo"
            fill
            sizes="(max-width: 768px) 75vw, 33vw"
            className="object-center object-cover"
          />
        </div>

        <div className="w-3/4 sm:w-1/2 md:w-1/3 shrink-0 h-full flex gap-1.5">
          {instagramPhotos[5].images.map((image, index) => (
            <div key={index} className="w-1/2 h-full relative overflow-hidden">
              <Image
                src={image}
                alt="Instagram Photo"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 38vw, 17vw"
              />
            </div>
          ))}
        </div>

        <div className="w-3/4 sm:w-1/2 md:w-1/3 shrink-0 relative overflow-hidden">
          <Image
            src={instagramPhotos[6].images[0]}
            alt="Instagram Photo"
            fill
            sizes="(max-width: 768px) 75vw, 33vw"
            className="object-center object-cover"
          />
        </div>
      </div>

      {/* Custom Centered Progress Scrollbar under the section */}
      <div className="w-full flex justify-center items-center pt-5 pb-2">
        <div className="relative w-44 sm:w-60 h-1 bg-border/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full transition-all duration-100 ease-out"
            style={{
              width: "30%",
              transform: `translateX(${scrollProgress * 2.33}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionInstagram;
