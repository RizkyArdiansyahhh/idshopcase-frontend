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
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const activeCreator = CREATOR_ENDORSE_DATA[activeIndex] || CREATOR_ENDORSE_DATA[0];

  // Track window resize for responsive card dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute responsive card dimensions
  const getCardDimensions = (isActive: boolean) => {
    if (windowWidth < 640) {
      // Mobile (< 640px)
      return {
        width: isActive ? Math.min(Math.round(windowWidth * 0.7), 260) : Math.min(Math.round(windowWidth * 0.28), 105),
        height: isActive ? 360 : 195,
      };
    }
    if (windowWidth < 1024) {
      // Tablet (640px - 1023px)
      return {
        width: isActive ? 320 : 155,
        height: isActive ? 440 : 250,
      };
    }
    // Desktop (>= 1024px)
    return {
      width: isActive ? 440 : 220,
      height: isActive ? 580 : 320,
    };
  };

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

    const cardEl = cardRefs.current[CREATOR_ENDORSE_DATA[index]?.id];
    if (cardEl && windowWidth < 1024) {
      cardEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
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
      className="w-full px-2 sm:px-4 py-6 md:py-10 overflow-hidden font-[family-name:var(--font-fustat)] select-none"
    >
      {/* Title Header (Dynamic i18n translation in Fustat) */}
      <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 space-y-1.5 sm:space-y-2">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-neutral-900 font-[family-name:var(--font-fustat)]">
          {t("endorseTitle")}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-neutral-500 font-normal max-w-xl mx-auto px-4">
          {t("endorseSubtitle")}
        </p>
      </div>

      {/* Mobile Active Creator Info Header (Clean dedicated card above the carousel) */}
      <div className="md:hidden text-center mb-3 min-h-[44px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCreator.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="space-y-0.5"
          >
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
              {activeCreator.name}
            </h3>
            <p className="text-xs text-neutral-500 font-normal">
              @{activeCreator.username} • {t(activeCreator.roleKey)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Single Row (Responsive Width, Horizontal Touch Scroll on Mobile/Tablet) */}
      <div className="w-full flex items-end justify-start md:justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto px-3 sm:px-4 pb-3 pt-2 scrollbar-none snap-x">
        {CREATOR_ENDORSE_DATA.map((creator, index) => {
          const isActive = index === activeIndex;
          const isLeftOrMid = activeIndex <= 1;
          const dimensions = getCardDimensions(isActive);

          return (
            <div
              key={creator.id}
              ref={(el) => {
                cardRefs.current[creator.id] = el;
              }}
              className="relative flex flex-col justify-end shrink-0 snap-center"
            >
              {/* Creator Info text: positioned directly beside the upper portion of the active card (Desktop Only) */}
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

              {/* The Card: Responsive Size, Full Color, Sharp Edges, Smooth Vertical Stretch */}
              <motion.div
                onClick={() => handleSelectCard(index)}
                animate={{
                  width: dimensions.width,
                  height: dimensions.height,
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
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-2 sm:gap-3 text-white z-20 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={isMuted ? "Aktifkan Suara" : "Bisukan"}
                      className="text-white/85 hover:text-white hover:scale-105 active:scale-95 transition-transform focus:outline-none cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={togglePlay}
                      title={isPlaying ? "Jeda" : "Putar"}
                      className="text-white/85 hover:text-white hover:scale-105 active:scale-95 transition-transform focus:outline-none cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current" />
                      )}
                    </button>
                  </div>
                )}

                {/* Username on non-active cards (Bottom Right: pure clean text without background) */}
                {!isActive && (
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] pointer-events-none">
                    <span className="text-[10px] sm:text-xs md:text-sm font-normal text-white/90 tracking-tight truncate max-w-[80px] sm:max-w-none block">
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
