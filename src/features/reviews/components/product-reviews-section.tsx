"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Camera, ChevronDown } from "lucide-react";
import { Review } from "@/types/api";
import { useGetReviews } from "../api/get-reviews";
import { ReviewCard, useMemoImages } from "./review-card";
import { ReviewLightbox, LightboxData } from "./review-lightbox";
import { useTranslations } from "next-intl";

// Fallback reviews for instant fail-safe
const DEFAULT_FALLBACK_REVIEWS: Review[] = [
  {
    id: "fb-1",
    username: "jihan_cooky",
    user_avatar: "https://down-id.img.susercontent.com/file/id-11134233-7rask-m5p4emoptl8zc9",
    rating_star: 5,
    comment:
      "Mantep banget pokoknya yaAllah gemas sekali! Hasil printing nya sangat sangat HD tidak blur sedikitpun, presisi di tombol dan kamera. Puas banget!",
    images: ["/images/katalog-instagram/1.jpg"],
    createdAt: "2 hari yang lalu",
    variant: "iPhone 16 • Clear Case",
  },
  {
    id: "fb-2",
    username: "youngtan2110",
    user_avatar: "https://down-id.img.susercontent.com/file/edf3bbfc97c50cb790c40fb125600094",
    rating_star: 5,
    comment:
      "Desain menarik, kualitas bahan tebal dan kokoh. Warna cetakannya pekat dan gak gampang pudar. Bakal langganan terus di Idshopcase.",
    images: ["/images/katalog-instagram/2.jpg"],
    createdAt: "3 hari yang lalu",
    variant: "iPhone 17 Pro Max • Clear Case",
  },
  {
    id: "fb-3",
    username: "anissafitria_99",
    user_avatar: null,
    rating_star: 5,
    comment:
      "Bagus banget case nyaaa! Bahan tebel, print rapi dan pas dicoba di hp langsung klik pas banget. Seller super ramah dan fast respon.",
    images: ["/images/katalog-instagram/5.jpg"],
    createdAt: "5 hari yang lalu",
    variant: "iPhone 16 • Softcase TPU",
  },
  {
    id: "fb-4",
    username: "ariiinarini",
    user_avatar: "https://down-id.img.susercontent.com/file/7ada8c1ec5cf96cccd0ef79515e3420c",
    rating_star: 5,
    comment:
      "Desainnya lucu banget, kualitas print tajam dan bahan bagus semoga awet. Packaging juga aman dilapisi bubble wrap tebal.",
    images: ["/images/katalog-instagram/8.jpg"],
    createdAt: "1 minggu yang lalu",
    variant: "iPhone 17 Pro Max • Clear Case",
  },
  {
    id: "fb-5",
    username: "greeynii",
    user_avatar: "https://down-id.img.susercontent.com/file/2a74b0f914f93ca36923f535b20ade7c",
    rating_star: 5,
    comment:
      "Udah langganan beli custom case di sini. Kualitasnya selalu konsisten jempolan, foto keluarga tercetak jernih banget. Rekomen!",
    images: ["/images/katalog-instagram/4.jpg"],
    createdAt: "1 minggu yang lalu",
    variant: "iPhone 16 • Clear Glass",
  },
  {
    id: "fb-6",
    username: "nabilazhr_",
    user_avatar: null,
    rating_star: 5,
    comment:
      "Gemeshhh banget desainnya! Bahan case fleksibel tapi protektif di sudut-sudutnya. Cocok banget buat kado atau dipake daily.",
    images: ["/images/katalog-instagram/11.jpg"],
    createdAt: "2 minggu yang lalu",
    variant: "iPhone 17 Pro Max • Clear Case",
  },
];

type FilterType = "all" | "with-images" | "star-5" | "star-4";

export const ProductReviewsSection = () => {
  const { data: apiReviews } = useGetReviews();

  const reviews = useMemo(() => {
    if (apiReviews && apiReviews.length > 0) return apiReviews;
    return DEFAULT_FALLBACK_REVIEWS;
  }, [apiReviews]);

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [lightboxData, setLightboxData] = useState<LightboxData>(null);

  // Collect all customer photos for the gallery strip
  const allCustomerPhotos = useMemo(() => {
    const photos: { url: string; review: Review }[] = [];
    reviews.forEach((rev) => {
      const imgs = useMemoImages(rev.images);
      imgs.forEach((url) => {
        photos.push({ url, review: rev });
      });
    });
    return photos;
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      const imgs = useMemoImages(rev.images);
      if (activeFilter === "with-images") return imgs.length > 0;
      if (activeFilter === "star-5") return rev.rating_star === 5;
      if (activeFilter === "star-4") return rev.rating_star === 4;
      return true;
    });
  }, [reviews, activeFilter]);

  const countWithImages = useMemo(() => {
    return reviews.filter((r) => useMemoImages(r.images).length > 0).length;
  }, [reviews]);

  const countStar5 = useMemo(() => {
    return reviews.filter((r) => r.rating_star === 5).length;
  }, [reviews]);

  const t = useTranslations("product");

  return (
    <section className="w-full py-8 space-y-8 font-[family-name:var(--font-fustat)] select-none text-neutral-900">
      {/* =========================================================================
          1. MONOCHROME SHARP HEADER & RATING SUMMARY
         ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h3 className="font-[family-name:var(--font-fustat)] text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
              {t("reviewsTitle")}
            </h3>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none border border-black bg-black text-white text-xs font-bold">
              <Star className="w-3 h-3 fill-white text-white" />
              <span>4.9 / 5.0</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            {t("reviewsSub")}
          </p>
        </div>

        {/* Sharp Monochrome Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveFilter("all");
              setVisibleCount(4);
            }}
            className={`px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
              activeFilter === "all"
                ? "bg-black text-white border-black"
                : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
            }`}
          >
            {t("reviewsAll")} ({reviews.length})
          </button>

          {countWithImages > 0 && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter("with-images");
                setVisibleCount(4);
              }}
              className={`px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all border cursor-pointer ${
                activeFilter === "with-images"
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t("reviewsWithPhotos")} ({countWithImages})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setActiveFilter("star-5");
              setVisibleCount(4);
            }}
            className={`px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all border cursor-pointer ${
              activeFilter === "star-5"
                ? "bg-black text-white border-black"
                : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Bintang 5 ({countStar5})</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. SHARP PHOTO GALLERY REEL
         ========================================================================= */}
      {allCustomerPhotos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="font-bold uppercase tracking-wider text-[11px] text-neutral-800">
              Galeri Foto Pembeli
            </span>
            <span className="text-[11px] text-neutral-400">
              Klik untuk memperbesar
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {allCustomerPhotos.map((item, idx) => (
              <button
                key={`photo-strip-${idx}`}
                type="button"
                onClick={() =>
                  setLightboxData({
                    imageUrl: item.url,
                    username: item.review.username,
                    comment: item.review.comment,
                    rating: item.review.rating_star,
                  })
                }
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-none overflow-hidden flex-shrink-0 border border-neutral-200 group hover:border-black transition-all cursor-pointer"
              >
                <Image
                  src={item.url}
                  alt={`customer-photo-${idx}`}
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          3. SHARP MONOCHROME REVIEW CARDS (2-Column Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.slice(0, visibleCount).map((rev) => (
          <ReviewCard
            key={rev.id}
            review={rev}
            onOpenLightbox={(data) => setLightboxData(data)}
          />
        ))}
      </div>

      {/* =========================================================================
          4. SHARP LOAD MORE BUTTON
         ========================================================================= */}
      {visibleCount < filteredReviews.length && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-8 py-3 rounded-none border border-neutral-300 hover:border-black bg-white hover:bg-black hover:text-white text-xs font-bold uppercase tracking-wider text-neutral-900 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Tampilkan Ulasan Lainnya</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================================
          5. SHARP LIGHTBOX MODAL
         ========================================================================= */}
      <ReviewLightbox
        data={lightboxData}
        onClose={() => setLightboxData(null)}
      />
    </section>
  );
};

export default ProductReviewsSection;
