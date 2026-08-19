"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { FaCheckCircle, FaStar, FaQuoteLeft } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "@/types/api";
import { ReviewItem } from "../api/get-random-reviews";
import { LightboxData } from "./review-lightbox";

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

type ReviewCardProps = {
  review: Review | ReviewItem;
  onOpenLightbox?: (data: NonNullable<LightboxData>) => void;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onOpenLightbox }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const images = useMemoImages(review.images);
  const username = review.username || "Pembeli Terverifikasi";

  // If onOpenLightbox is provided, render the clean luxury product page review card
  if (onOpenLightbox) {
    return (
      <div className="py-6 border-b border-neutral-100 first:pt-2 last:border-b-0 space-y-3 font-sans">
        {/* Top Meta: Stars + Username + Date */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {review.user_avatar ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-neutral-200">
                <Image
                  src={review.user_avatar}
                  alt={username}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-800 font-medium text-xs flex items-center justify-center border border-neutral-200 shrink-0">
                {username.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h4 className="text-xs sm:text-sm font-medium text-neutral-900">
                {username}
              </h4>
              <p className="text-[11px] text-neutral-400 font-normal">
                {("createdAt" in review && review.createdAt) || "Ulasan Pembeli"}
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
                    username: username,
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
  }

  // Standalone testimonial card for homepage grid
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <div className="h-auto flex flex-col justify-between p-5 rounded-none bg-white border border-neutral-200 hover:border-black transition-all duration-200 font-sans group">
      <div className="overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 mb-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-9 w-9 border border-neutral-200 shrink-0">
              {review.user_avatar && (
                <AvatarImage
                  src={review.user_avatar}
                  alt={username}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-neutral-100 text-neutral-900 text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm font-semibold text-neutral-900 truncate">
                {username}
              </span>
              <FaCheckCircle className="size-3.5 text-emerald-600 shrink-0" title="Pembeli Terverifikasi" />
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0 bg-neutral-50 border border-neutral-200 px-2 py-1">
            {Array.from({ length: Math.min(Math.max(review.rating_star, 1), 5) }).map((_, i) => (
              <FaStar key={i} className="size-2.5 text-neutral-900" />
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="relative overflow-hidden mt-1">
          <FaQuoteLeft className="size-3 text-neutral-300 absolute -top-0.5 -left-0.5 pointer-events-none" />
          <p
            title={review.comment}
            className="text-xs sm:text-sm text-neutral-700 leading-relaxed pl-3.5 font-normal line-clamp-4"
          >
            {review.comment}
          </p>
        </div>
      </div>

      {/* Review Media Photos */}
      {images.length > 0 && (
        <div className="pt-2.5 border-t border-neutral-100 shrink-0 mt-3">
          <div className="flex gap-2 items-center">
            {images.slice(0, 3).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(imgUrl)}
                className="relative h-11 w-11 rounded-none overflow-hidden border border-neutral-200 cursor-pointer shrink-0 hover:scale-105 transition-transform bg-neutral-50"
              >
                <Image
                  src={imgUrl}
                  alt={`Review photo ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-lg max-h-[80vh] w-full h-[70vh] rounded-none overflow-hidden bg-white">
            <Image
              src={selectedPhoto}
              alt="Review full photo"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 bg-black text-white px-3 py-1 text-xs font-semibold cursor-pointer"
            >
              ✕ Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
