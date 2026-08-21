"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Review } from "@/types/api";
import { ReviewItem } from "../api/get-random-reviews";
import { LightboxData } from "./review-lightbox";

export function useMemoImages(imgs?: string[] | string | null): string[] {
  if (!imgs) return [];
  if (Array.isArray(imgs))
    return imgs.filter(
      (url) =>
        typeof url === "string" &&
        (url.startsWith("http") || url.startsWith("/images/")),
    );
  if (typeof imgs === "string" && imgs.startsWith("[")) {
    try {
      const parsed = JSON.parse(imgs);
      return Array.isArray(parsed)
        ? parsed.filter(
            (url) =>
              typeof url === "string" &&
              (url.startsWith("http") || url.startsWith("/images/")),
          )
        : [];
    } catch {
      return [];
    }
  }
  if (
    typeof imgs === "string" &&
    (imgs.startsWith("http") || imgs.startsWith("/images/"))
  ) {
    return [imgs];
  }
  return [];
}

type ReviewCardProps = {
  review: Review | ReviewItem;
  onOpenLightbox?: (data: NonNullable<LightboxData>) => void;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onOpenLightbox,
}) => {
  const images = useMemoImages(review.images);
  const username = review.username || "Pembeli Terverifikasi";
  const variantText =
    ("variant" in review && review.variant) || "iPhone 16 • Clear Case";
  const dateText =
    ("createdAt" in review && review.createdAt) || "Ulasan Pembeli";

  // Product Detail Sharp Monochrome Card
  if (onOpenLightbox) {
    return (
      <div className="p-6 rounded-none border border-neutral-200 bg-white hover:border-black transition-all duration-200 flex flex-col justify-between space-y-4 font-sans text-neutral-900">
        {/* Top: Avatar + Name + Rating Stars */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            {review.user_avatar ? (
              <div className="relative w-9 h-9 rounded-none overflow-hidden shrink-0 border border-neutral-200 bg-neutral-50">
                <Image
                  src={review.user_avatar}
                  alt={username}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-none bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center border border-neutral-200 shrink-0">
                {username.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                  {username}
                </h4>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded-none border border-neutral-300 text-neutral-600">
                  Terverifikasi
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-normal mt-0.5">
                {variantText} • {dateText}
              </p>
            </div>
          </div>

          {/* Monochrome Black Stars */}
          <div className="flex items-center gap-0.5 shrink-0">
            {[...Array(review.rating_star)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-black text-black"
              />
            ))}
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-sm text-neutral-700 font-normal leading-relaxed">
          &ldquo;{review.comment}&rdquo;
        </p>

        {/* Attached Photo Thumbnails (Sharp) */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {images.map((imgUrl, imgIdx) => (
              <button
                key={`rev-img-${imgIdx}`}
                type="button"
                onClick={() =>
                  onOpenLightbox({
                    imageUrl: imgUrl,
                    username: username,
                    comment: review.comment,
                    rating: review.rating_star,
                  })
                }
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-none overflow-hidden border border-neutral-200 hover:border-black transition-all cursor-pointer group"
              >
                <Image
                  src={imgUrl}
                  alt={`review-attachment-${imgIdx}`}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Fallback / Standard Card
  return (
    <div className="p-5 rounded-none bg-white border border-neutral-200 hover:border-black transition-all space-y-3 font-sans text-neutral-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-neutral-900">{username}</span>
        <div className="flex items-center gap-0.5">
          {[...Array(review.rating_star)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
          ))}
        </div>
      </div>
      <p className="text-xs text-neutral-600 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
    </div>
  );
};
