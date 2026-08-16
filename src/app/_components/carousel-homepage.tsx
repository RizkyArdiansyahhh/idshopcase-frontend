"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  "/images/main-assets/carousel-2.jpeg",
  "/images/main-assets/carousel-1.jpeg",
  "/images/main-assets/carousel-3.jpeg",
];

const DURATION = 5000;
const TICK = 50;

export const CarouselHomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /* PROGRESS */
  useEffect(() => {
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (TICK / DURATION) * 100, 100));
    }, TICK);

    const slideTimeout = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
    };
  }, [activeIndex]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-foreground">
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[activeIndex]}
            fill
            alt="hero-banner"
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Right Center: Dot Progress Indicators */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="p-1 hover:scale-110 transition-transform"
            title={`Slide ${index + 1}`}
          >
            <DotProgress
              active={index === activeIndex}
              progress={index === activeIndex ? progress : 0}
            />
          </button>
        ))}
      </div>

      {/* Bottom Center: Glowing Vertical Fill-Down Animation */}
      <CarouselScrollDown />
    </section>
  );
};

export function CarouselScrollDown() {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 20,
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <button
        onClick={handleScrollDown}
        className="group flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll Down"
      >
        {/* Teks Label Uppercase */}
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">
          SCROLL DOWN
        </span>

        {/* Animasi Garis Vertikal (Continuous Fill-Down Loop) */}
        <div className="w-0.5 h-12 bg-white/20 relative overflow-hidden rounded-t-full">
          <motion.div
            animate={{
              top: ["0%", "0%", "100%", "0%"],
              bottom: ["100%", "0%", "0%", "100%"],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.9, 1],
            }}
            className="absolute left-0 w-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
          />
        </div>
      </button>
    </div>
  );
}

type DotProgressProps = {
  active: boolean;
  progress: number;
};

export const DotProgress = ({ active, progress }: DotProgressProps) => {
  const radius = 8;
  const stroke = 2;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      className={clsx(
        "transition-all duration-300",
        active ? "scale-110" : "opacity-80",
      )}
    >
      {!active && (
        <circle fill="white" r={normalizedRadius} cx={radius} cy={radius} />
      )}

      {active && (
        <>
          <circle
            stroke="rgba(255,255,255,0.25)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke="white"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-[stroke-dashoffset] duration-75 ease-linear"
          />
        </>
      )}
    </svg>
  );
};
