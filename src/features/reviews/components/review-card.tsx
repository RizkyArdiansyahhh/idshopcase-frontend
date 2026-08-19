"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Review } from "@/types/api";
import { LightboxData } from "./review-lightbox";

interface ReviewCardProps {
  review: Review;
  onOpenLightbox: (data: NonNullable<LightboxData>) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onOpenLightbox }) => {
  const images = useMemoImages(review.images);

  return (
    <div className="py-6 border-b border-neutral-100 first:pt-2 last:border-b-0 space-y-3">
      {/* Top Meta: Stars + Username + Date */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar (Subtle Minimalist) */}
          {review.user_avatar ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-neutral-200">
              <Image
                src={review.user_avatar}
                alt={review.username}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-800 font-medium text-xs flex items-center justify-center border border-neutral-200 shrink-0">
              {review.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h4 className="text-xs sm:text-sm font-medium text-neutral-900">
              {review.username}
            </h4>
            <p className="text-[11px] text-neutral-400 font-normal">
              {review.createdAt || "Ulasan Pembeli"}
            </p>
          </div>
        </div>

        {/* 5 Stars */}
        <div className="flex items-center gap-0.5 shrink-0">
          {[...Array(review.rating_star)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-neutral-900 text-neutral-900" />
          ))}
        </div>
      </div>

      {/* Review Comment Text */}
      <p className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed">
        {review.comment}
      </p>

      {/* Attached Customer Photos */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {images.map((imgUrl, imgIdx) => (
            <button
              key={`rev-img-${imgIdx}`}
              type="button"
              onClick={() =>
                onOpenLightbox({
                  imageUrl: imgUrl,
                  username: review.username,
                  comment: review.comment,
                  rating: review.rating_star,
                })
              }
              className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-none overflow-hidden border border-neutral-200/80 hover:border-black transition-all cursor-pointer group shadow-2xs hover:scale-105 active:scale-95"
            >
              <Image
                src={imgUrl}
                alt={`review-attachment-${imgIdx}`}
                fill
                sizes="72px"
                className="object-cover group-hover:scale-110 transition-transform duration-200"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export function useMemoImages(imgs?: string[] | string): string[] {
  if (!imgs) return [];
  if (Array.isArray(imgs)) return imgs.filter((url) => typeof url === "string" && url.startsWith("http"));
  if (typeof imgs === "string" && imgs.startsWith("[")) {
    try {
      const parsed = JSON.parse(imgs);
      return Array.isArray(parsed) ? parsed.filter((url) => typeof url === "string" && url.startsWith("http")) : [];
    } catch {
      return [];
    }
  }
  return [];
}
