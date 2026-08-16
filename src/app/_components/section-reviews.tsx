"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { LogoLoop, LogoItem } from "@/components/LogoLoop";
import { api } from "@/lib/axios";

export interface ReviewItem {
  id: string | number;
  username: string;
  user_avatar?: string | null;
  rating_star: number;
  comment: string;
  images?: string[];
  product_name?: string;
  source?: string;
}

// Curated authentic reviews as instant fallback
const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    username: "jihan_cooky",
    user_avatar: "https://down-id.img.susercontent.com/file/id-11134233-7rask-m5p4emoptl8zc9",
    rating_star: 5,
    comment:
      "Mantep banget pokoknya yaAllah gemas sekali! Hasil printing nya sangat sangat HD tidak blur sedikitpun, presisi di tombol dan kamera. Puas banget!",
    product_name: "Custom Case Hardcase",
    source: "Shopee Verified",
  },
  {
    id: 2,
    username: "youngtan2110",
    user_avatar: "https://down-id.img.susercontent.com/file/edf3bbfc97c50cb790c40fb125600094",
    rating_star: 5,
    comment:
      "Desain menarik, kualitas bahan tebal dan kokoh. Warna cetakannya pekat dan gak gampang pudar. Bakal langganan terus di Idshopcase.",
    product_name: "Custom Case Fuze Anti-Drop",
    source: "Shopee Verified",
  },
  {
    id: 3,
    username: "anissafitria_99",
    user_avatar: null,
    rating_star: 5,
    comment:
      "Bagus banget case nyaaa! Bahan tebel, print rapi dan pas dicoba di hp langsung klik pas banget. Seller super ramah dan fast respon.",
    product_name: "Custom Case Clear Acrylic",
    source: "Shopee Verified",
  },
  {
    id: 4,
    username: "ariiinarini",
    user_avatar: "https://down-id.img.susercontent.com/file/7ada8c1ec5cf96cccd0ef79515e3420c",
    rating_star: 5,
    comment:
      "Desainnya lucu banget, kualitas print tajam dan bahan bagus semoga awet. Packaging juga aman dilapisi bubble wrap tebal.",
    product_name: "Custom Case Black Matte",
    source: "Shopee Verified",
  },
  {
    id: 5,
    username: "greeynii",
    user_avatar: "https://down-id.img.susercontent.com/file/2a74b0f914f93ca36923f535b20ade7c",
    rating_star: 5,
    comment:
      "Udah langganan beli custom case di sini. Kualitasnya selalu konsisten jempolan, foto keluarga tercetak jernih banget. Rekomen!",
    product_name: "Custom Case Glass Premium",
    source: "Shopee Verified",
  },
  {
    id: 6,
    username: "nabilazhr_",
    user_avatar: null,
    rating_star: 5,
    comment:
      "Gemeshhh banget desainnya! Bahan case fleksibel tapi protektif di sudut-sudutnya. Cocok banget buat kado atau dipake daily.",
    product_name: "Custom Case Softcase TPU",
    source: "Shopee Verified",
  },
];

// Animated Number Counter Component
function AnimatedRatingCounter({
  target,
  decimals = 1,
  isInView,
}: {
  target: number;
  decimals?: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState<string>("0.0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8s smooth count-up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Quartic ease out curve for silky smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = (easeOut * target).toFixed(decimals);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target.toFixed(decimals));
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, decimals]);

  return <span>{count}</span>;
}

export function SectionReviews() {
  const t = useTranslations("home");
  const [reviews, setReviews] = useState<ReviewItem[]>(FALLBACK_REVIEWS);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });

  useEffect(() => {
    // Attempt to fetch fresh random customer reviews from API
    const fetchReviews = async () => {
      try {
        const res = await api.get("/review/random?limit=12&isCommented=true");
        if (res.data?.success && Array.isArray(res.data?.data) && res.data.data.length > 0) {
          const formatted: ReviewItem[] = res.data.data
            .filter((item: any) => item.comment && item.comment.trim().length > 10)
            .map((item: any) => ({
              id: item.id || item.shopee_rating_id,
              username: item.username || "Pembeli Terverifikasi",
              user_avatar: item.user_avatar || null,
              rating_star: item.rating_star || 5,
              comment: item.comment.replace(/Desain:|Kualitas:|Kualitas Bahan:/g, "").trim(),
              images: item.images || [],
              product_name: "Custom Case Premium",
              source: "Shopee Verified",
            }));

          if (formatted.length >= 4) {
            setReviews(formatted);
          }
        }
      } catch (err) {
        // Silently use FALLBACK_REVIEWS
      }
    };

    fetchReviews();
  }, []);

  // Format reviews into LogoItem nodes for LogoLoop
  const loopItems: LogoItem[] = reviews.map((item) => ({
    node: (
      <div
        key={item.id}
        className="w-[310px] sm:w-[350px] md:w-[380px] h-[320px] p-6 sm:p-7 bg-card border border-border/70 rounded-none flex flex-col justify-between select-none shadow-sm transition-shadow hover:shadow-md mx-2 text-left"
      >
        {/* Top: Quote text with quotation marks */}
        <div className="space-y-3">
          {/* 5 Stars Rating */}
          <div className="flex items-center gap-1">
            {[...Array(item.rating_star || 5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          <p className="text-sm sm:text-base text-foreground/90 font-normal leading-relaxed line-clamp-4">
            “{item.comment}”
          </p>
        </div>

        {/* Bottom: User identity & Verified Badge */}
        <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            {item.user_avatar ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-muted border border-border/50">
                <Image
                  src={item.user_avatar}
                  alt={item.username}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-semibold text-sm shrink-0">
                {item.username.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Username & Subtitle */}
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">
                {item.username}
              </h4>
              <p className="text-xs text-muted-foreground truncate font-normal">
                {item.source || "Shopee Buyer"}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section
      ref={sectionRef}
      className="w-full py-8 md:py-14 overflow-hidden"
    >
      {/* Title Header (Left Aligned matching Reference Image) */}
      <div className="w-full text-left max-w-7xl mx-auto mb-6 md:mb-8 px-2 sm:px-4 lg:px-6 space-y-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          {t("reviewsTitle")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal max-w-2xl">
          {t("reviewsSubtitle")}
        </p>
      </div>

      {/* Main Review Layout: Primary Left Card + LogoLoop with Left/Right Disappearing Gradient Shadow */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5">
        {/* 1. Left Card: Primary Colored Stats Card */}
        <div className="w-full lg:w-[290px] xl:w-[320px] shrink-0 h-[280px] lg:h-[320px] p-6 sm:p-8 bg-primary text-primary-foreground rounded-none flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Big Rating Number (0.0 -> 4.9 on viewport enter) */}
          <span className="text-6xl sm:text-7xl font-bold tracking-tight text-primary-foreground font-sans tabular-nums">
            <AnimatedRatingCounter target={4.9} decimals={1} isInView={isInView} />
          </span>

          {/* 5 Gold Stars */}
          <div className="flex items-center gap-1.5 mt-3 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-amber-300 text-amber-300"
              />
            ))}
          </div>

          {/* Accumulated Review Count Label */}
          <p className="text-sm sm:text-base font-medium text-primary-foreground/95 mt-1">
            {t("reviewsRatingLabel")}
          </p>
        </div>

        {/* 2. Right Side: Infinite LogoLoop with Left/Right Edge Fade Shadows */}
        <div className="relative flex-1 min-w-0 overflow-hidden flex items-center">
          {/* Left Edge Shadow/Gradient (Cards disappear smoothly into this mask on the left!) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />

          <LogoLoop
            logos={loopItems}
            speed={35}
            direction="left"
            pauseOnHover={true}
            gap={12}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default SectionReviews;
