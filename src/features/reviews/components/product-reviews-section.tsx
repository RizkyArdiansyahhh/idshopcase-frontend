"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Image as ImageIcon, ChevronRight, Eye } from "lucide-react";
import { Review } from "@/types/api";
import { useGetReviews } from "../api/get-reviews";
import { ReviewCard, useMemoImages } from "./review-card";
import { ReviewLightbox, LightboxData } from "./review-lightbox";

// Fallback reviews for instant fail-safe
const DEFAULT_FALLBACK_REVIEWS: Review[] = [
  {
    id: "fb-1",
    username: "jihan_cooky",
    user_avatar: "https://down-id.img.susercontent.com/file/id-11134233-7rask-m5p4emoptl8zc9",
    rating_star: 5,
    comment:
      "Mantep banget pokoknya yaAllah gemas sekali! Hasil printing nya sangat sangat HD tidak blur sedikitpun, presisi di tombol dan kamera. Puas banget!",
    images: ["https://down-id.img.susercontent.com/file/id-11134103-7ra0h-mdjyhtzsck989b"],
    createdAt: "2 hari lalu",
    variant: "iPhone 16 - Clear Case",
  },
  {
    id: "fb-2",
    username: "youngtan2110",
    user_avatar: "https://down-id.img.susercontent.com/file/edf3bbfc97c50cb790c40fb125600094",
    rating_star: 5,
    comment:
      "Desain menarik, kualitas bahan tebal dan kokoh. Warna cetakannya pekat dan gak gampang pudar. Bakal langganan terus di Idshopcase.",
    images: ["https://down-id.img.susercontent.com/file/id-11134103-82252-miv2jvpyp5vr90"],
    createdAt: "3 hari lalu",
    variant: "iPhone 17 Pro Max - Clear Case",
  },
  {
    id: "fb-3",
    username: "anissafitria_99",
    user_avatar: null,
    rating_star: 5,
    comment:
      "Bagus banget case nyaaa! Bahan tebel, print rapi dan pas dicoba di hp langsung klik pas banget. Seller super ramah dan fast respon.",
    images: ["https://down-id.img.susercontent.com/file/id-11134103-7ra0s-mdqv5w3l7wzvaf"],
    createdAt: "5 hari lalu",
    variant: "iPhone 16 - Softcase TPU",
  },
  {
    id: "fb-4",
    username: "ariiinarini",
    user_avatar: "https://down-id.img.susercontent.com/file/7ada8c1ec5cf96cccd0ef79515e3420c",
    rating_star: 5,
    comment:
      "Desainnya lucu banget, kualitas print tajam dan bahan bagus semoga awet. Packaging juga aman dilapisi bubble wrap tebal.",
    images: ["https://down-id.img.susercontent.com/file/id-11134103-8224s-ml2z8esnnj7p57"],
    createdAt: "1 minggu lalu",
    variant: "iPhone 17 Pro Max - Clear Case",
  },
  {
    id: "fb-5",
    username: "greeynii",
    user_avatar: "https://down-id.img.susercontent.com/file/2a74b0f914f93ca36923f535b20ade7c",
    rating_star: 5,
    comment:
      "Udah langganan beli custom case di sini. Kualitasnya selalu konsisten jempolan, foto keluarga tercetak jernih banget. Rekomen!",
    images: ["https://down-id.img.susercontent.com/file/id-11134103-7ra0t-md4jchcjfxg8ba"],
    createdAt: "1 minggu lalu",
    variant: "iPhone 16 - Clear Glass",
  },
  {
    id: "fb-6",
    username: "nabilazhr_",
    user_avatar: null,
    rating_star: 5,
    comment:
      "Gemeshhh banget desainnya! Bahan case fleksibel tapi protektif di sudut-sudutnya. Cocok banget buat kado atau dipake daily.",
    images: ["https://down-id.img.susercontent.com/file/id-11134103-7ra0p-mcllq6i5eq7w01"],
    createdAt: "2 minggu lalu",
    variant: "iPhone 17 Pro Max - Clear Case",
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

  // Collect all customer testimonial photos for the photo reel strip
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

  const countStar4 = useMemo(() => {
    return reviews.filter((r) => r.rating_star === 4).length;
  }, [reviews]);

  return (
    <section className="w-full py-6 md:py-8 space-y-6 font-sans">
      {/* =========================================================================
          1. CLEAN MINIMALIST HEADER & SCORE
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-neutral-200 gap-4">
        {/* Title + Star Score */}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-bold tracking-wider text-neutral-900 uppercase">
              Ulasan Pelanggan
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-none bg-neutral-100 text-neutral-800 border border-neutral-200">
              ★ 4.9
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-normal">
            Berdasarkan <strong>12.400+ ulasan</strong> pembeli produk ini
          </p>
        </div>

        {/* Minimalist Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveFilter("all");
              setVisibleCount(4);
            }}
            className={`px-3 py-1 rounded-none text-xs font-normal transition-all border ${
              activeFilter === "all"
                ? "bg-neutral-900 text-white border-neutral-900 shadow-2xs"
                : "bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-300"
            }`}
          >
            Semua ({reviews.length})
          </button>

          {countWithImages > 0 && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter("with-images");
                setVisibleCount(4);
              }}
              className={`px-3 py-1 rounded-none text-xs font-normal flex items-center gap-1 transition-all border ${
                activeFilter === "with-images"
                  ? "bg-neutral-900 text-white border-neutral-900 shadow-2xs"
                  : "bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-300"
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>Foto ({countWithImages})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setActiveFilter("star-5");
              setVisibleCount(4);
            }}
            className={`px-3 py-1 rounded-none text-xs font-normal flex items-center gap-1 transition-all border ${
              activeFilter === "star-5"
                ? "bg-neutral-900 text-white border-neutral-900 shadow-2xs"
                : "bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-300"
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>5 ({countStar5})</span>
          </button>

          {countStar4 > 0 && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter("star-4");
                setVisibleCount(4);
              }}
              className={`px-3 py-1 rounded-none text-xs font-normal flex items-center gap-1 transition-all border ${
                activeFilter === "star-4"
                  ? "bg-neutral-900 text-white border-neutral-900 shadow-2xs"
                  : "bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-300"
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>4 ({countStar4})</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          2. MINIMALIST CUSTOMER PHOTO STRIP
         ========================================================================= */}
      {allCustomerPhotos.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="font-medium text-neutral-800">
              Galeri Foto Pembeli ({allCustomerPhotos.length})
            </span>
            <span className="text-[11px] text-neutral-400">
              Klik untuk perbesar
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
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
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-none overflow-hidden flex-shrink-0 border border-neutral-200/80 group hover:border-black transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              >
                <Image
                  src={item.url}
                  alt={`customer-photo-${idx}`}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          3. CLEAN DIVIDER-BASED REVIEW LIST
         ========================================================================= */}
      <div className="divide-y divide-neutral-100">
        {filteredReviews.slice(0, visibleCount).map((rev) => (
          <ReviewCard
            key={rev.id}
            review={rev}
            onOpenLightbox={(data) => setLightboxData(data)}
          />
        ))}
      </div>

      {/* =========================================================================
          4. LOAD MORE (MINIMALIST BUTTON)
         ========================================================================= */}
      {visibleCount < filteredReviews.length && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-5 py-2 rounded-none border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-all shadow-2xs flex items-center gap-1.5"
          >
            <span>Tampilkan Ulasan Lainnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================================
          5. LIGHTBOX MODAL
         ========================================================================= */}
      <ReviewLightbox
        data={lightboxData}
        onClose={() => setLightboxData(null)}
      />
    </section>
  );
};

export default ProductReviewsSection;
