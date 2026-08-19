"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const BannerVideoHomePage = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Animasi dibuat responsif & cepat muncul saat mulai di-scroll
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.75]);
  const textOpacity = useTransform(scrollYProgress, [0.03, 0.22], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.03, 0.22], [30, 0]);

  return (
    <section ref={ref} className="h-[130vh] w-screen">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-6 px-5">
        <motion.div
          style={{ scale }}
          className="w-full h-[60vh] sm:h-[65vh] overflow-hidden rounded-xs"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="/videos/video-1.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="text-center max-w-3xl mb-12 sm:mb-16 md:mb-20 px-2"
        >
          <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Perlindungan <span className="text-foreground/40">Maksimal</span>{" "}
            Dengan Desain Yang Tetap{" "}
            <span className="text-foreground/40">Elegan</span>.
          </h1>
        </motion.div>
      </div>
    </section>
  );
};
