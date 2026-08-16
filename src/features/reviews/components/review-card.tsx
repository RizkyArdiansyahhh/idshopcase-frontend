"use client";

import { ReviewItem } from "../api/get-random-reviews";
import { FaStar, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";

type ReviewCardProps = {
  review: ReviewItem;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Parse review images if json string
  let reviewImages: string[] = [];
  if (Array.isArray(review.images)) {
    reviewImages = review.images;
  } else if (typeof review.images === "string") {
    try {
      const parsed = JSON.parse(review.images);
      if (Array.isArray(parsed)) reviewImages = parsed;
    } catch {
      reviewImages = [];
    }
  }

  const username = review.username || "Pembeli Terverifikasi";
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <div className="h-auto flex flex-col justify-between p-5 rounded-2xl bg-card/60 dark:bg-muted/20 border border-border/60 hover:border-foreground/30 hover:shadow-md transition-all duration-300 group">
      <div className="overflow-hidden flex flex-col">
        {/* Top Header: User Info & Black Stars on Grey Badge */}
        <div className="flex items-center justify-between gap-3 mb-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-9 w-9 border border-border/60 shrink-0">
              {review.user_avatar && !imageError ? (
                <AvatarImage
                  src={review.user_avatar}
                  alt={username}
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : null}
              <AvatarFallback className="bg-muted text-foreground text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">
                {username}
              </span>
              <FaCheckCircle className="size-3.5 text-emerald-500 shrink-0" title="Pembeli Terverifikasi" />
            </div>
          </div>

          {/* Black Stars on Subtle Grey Badge */}
          <div className="flex items-center gap-0.5 shrink-0 bg-muted/80 dark:bg-muted border border-border/60 px-2 py-1 rounded-full">
            {Array.from({ length: Math.min(Math.max(review.rating_star, 1), 5) }).map((_, i) => (
              <FaStar key={i} className="size-2.5 text-foreground" />
            ))}
          </div>
        </div>

        {/* Comment with Line-Clamp */}
        <div className="relative overflow-hidden mt-1">
          <FaQuoteLeft className="size-3 text-muted-foreground/30 absolute -top-0.5 -left-0.5 pointer-events-none" />
          <p
            title={review.comment}
            className="text-xs sm:text-sm text-foreground/85 leading-relaxed pl-3.5 font-normal line-clamp-4"
          >
            {review.comment}
          </p>
        </div>
      </div>

      {/* Review Media Photos (if buyer uploaded photo of their custom case) */}
      {reviewImages.length > 0 && (
        <div className="pt-2.5 border-t border-border/40 shrink-0 mt-2">
          <div className="flex gap-2 items-center">
            {reviewImages.slice(0, 3).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(imgUrl)}
                className="relative h-11 w-11 rounded-lg overflow-hidden border border-border/70 cursor-pointer shrink-0 hover:scale-105 transition-transform bg-muted"
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

      {/* Photo Modal Preview if clicked */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-lg max-h-[80vh] w-full h-[70vh] rounded-2xl overflow-hidden bg-background">
            <Image
              src={selectedPhoto}
              alt="Review full photo"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 text-xs font-bold"
            >
              ✕ Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
