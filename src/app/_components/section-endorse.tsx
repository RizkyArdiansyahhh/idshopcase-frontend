"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useTranslations } from "next-intl";

export interface CreatorEndorseItem {
  id: string;
  name: string;
  username: string;
  roleKey: "roleOwner" | "roleInfluencer";
  image: string;
  video?: string;
}

const CREATOR_ENDORSE_DATA: CreatorEndorseItem[] = [
  {
    id: "creator-1",
    name: "Nasaria Astri",
    username: "nasariastri",
    roleKey: "roleInfluencer",
    image: "/images/testimoni/nasariastri.jpg",
  },
  {
    id: "creator-2",
    name: "Iqbal Damara",
    username: "_iqbaldama",
    roleKey: "roleOwner",
    image: "/images/testimoni/_iqbaldama.jpg",
    video: "/videos/testimoni/_iqbaldama.mp4",
  },
  {
    id: "creator-3",
    name: "Syafira Hidayati",
    username: "syafira_hdd",
    roleKey: "roleInfluencer",
    image: "/images/testimoni/syafira_hdd.jpg",
    video: "/videos/testimoni/syafira_hdd.mp4",
  },
  {
    id: "creator-4",
    name: "Winda Anggreini",
    username: "windaanggreini",
    roleKey: "roleInfluencer",
    image: "/images/testimoni/windaanggreini.jpg",
  },
];

export function SectionEndorse() {
  const t = useTranslations("home");

  // Default active card is the 2nd card (index 1: Iqbal Damara)
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const activeCreator = CREATOR_ENDORSE_DATA[activeIndex] || CREATOR_ENDORSE_DATA[0];

  // Manage video playback across all cards persistently
  useEffect(() => {
    CREATOR_ENDORSE_DATA.forEach((creator, idx) => {
      const vid = videoRefs.current[creator.id];
      if (!vid) return;

      if (idx === activeIndex) {
        vid.muted = isMuted;
        if (isInView && isPlaying) {
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => setIsPlaying(false));
          }
        } else {
          vid.pause();
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [isInView, isPlaying, activeIndex, isMuted]);

  const handleSelectCard = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[activeCreator.id];
    if (!vid) return;

    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[activeCreator.id];
    if (vid) {
      vid.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full px-1 sm:px-2 py-6 md:py-10 overflow-hidden"
    >
      {/* Title Header (Dynamic i18n translation) */}
      <div className="text-center max-w-3xl mx-auto mb-4 md:mb-6 space-y-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          {t("endorseTitle")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal">
          {t("endorseSubtitle")}
        </p>
      </div>

      {/* Main Single Static Row (Full Width Edge-to-Edge, Large Sizing) */}
      <div className="w-full flex items-end justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 pt-2 scrollbar-none">
        {CREATOR_ENDORSE_DATA.map((creator, index) => {
          const isActive = index === activeIndex;
          const isLeftOrMid = activeIndex <= 1;

          return (
            <div key={creator.id} className="relative flex flex-col justify-end">
              {/* Creator Info text: positioned directly beside the upper portion of the active card */}
              {isActive && (
                <div
                  className={`hidden md:block absolute top-2 ${
                    isLeftOrMid
                      ? "left-full ml-4 text-left"
                      : "right-full mr-4 text-right"
                  } z-20 pointer-events-none whitespace-nowrap`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={creator.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-0.5"
                    >
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
                        {creator.name}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground font-normal">
                        @{creator.username} • {t(creator.roleKey)}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Info Text on top */}
              {isActive && (
                <div className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-20 pointer-events-none">
                  <h3 className="text-base font-semibold text-foreground">
                    {creator.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-normal">
                    @{creator.username} • {t(creator.roleKey)}
                  </p>
                </div>
              )}

              {/* The Card: Large, Full Color, Sharp Edges, Smooth Vertical Stretch */}
              <motion.div
                onClick={() => handleSelectCard(index)}
                animate={{
                  width: isActive ? 460 : 230,
                  height: isActive ? 600 : 330,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                  mass: 0.85,
                }}
                className={`relative overflow-hidden shrink-0 select-none shadow-md opacity-100 ${
                  isActive ? "shadow-2xl z-10 cursor-default" : "shadow-sm"
                }`}
                style={{
                  transformOrigin: "bottom center",
                  cursor: isActive
                    ? "default"
                    : "url('/icons/cursor-play.svg') 48 48, pointer",
                }}
              >
                {/* 1. Crystal-Clear Base Image Thumbnail: ALWAYS present on all cards */}
                <Image
                  src={creator.image}
                  alt={creator.name}
                  fill
                  sizes={isActive ? "500px" : "300px"}
                  className="object-cover object-center"
                  priority={isActive || index === 1}
                />

                {/* 2. Layered Video: Only visible (opacity-100) when this card is active */}
                {creator.video && (
                  <video
                    ref={(el) => {
                      videoRefs.current[creator.id] = el;
                    }}
                    src={creator.video}
                    playsInline
                    loop
                    muted={isMuted}
                    preload="metadata"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isActive ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
                    }`}
                  />
                )}

                {/* Subtle vignette gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-2" />

                {/* Active Controls: Icons without background container, drop-shadow for crisp visibility */}
                {isActive && creator.video && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-3 text-white z-20 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={isMuted ? "Aktifkan Suara" : "Bisukan"}
                      className="text-white/85 hover:text-white hover:scale-105 active:scale-95 transition-transform focus:outline-none cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={togglePlay}
                      title={isPlaying ? "Jeda" : "Putar"}
                      className="text-white/85 hover:text-white hover:scale-105 active:scale-95 transition-transform focus:outline-none cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                      )}
                    </button>
                  </div>
                )}

                {/* Username on non-active cards (Bottom Right: pure clean text without background) */}
                {!isActive && (
                  <div className="absolute bottom-3 right-3 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] pointer-events-none">
                    <span className="text-xs sm:text-sm font-normal text-white/90 tracking-tight">
                      @{creator.username}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SectionEndorse;
