"use client";

import React from "react";
import Image from "next/image";
import { Star, X } from "lucide-react";

export type LightboxData = {
  imageUrl: string;
  username: string;
  comment: string;
  rating: number;
} | null;

interface ReviewLightboxProps {
  data: LightboxData;
  onClose: () => void;
}

export const ReviewLightbox: React.FC<ReviewLightboxProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-none p-5 sm:p-6 max-w-lg w-full shadow-2xl relative space-y-4 animate-in zoom-in-95 duration-200 border border-neutral-900 text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2.5">
            <h4 className="text-sm font-bold text-neutral-900 uppercase">
              Foto Ulasan dari {data.username}
            </h4>
            <div className="flex items-center gap-0.5">
              {[...Array(data.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-black text-black"
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-none border border-neutral-300 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Image Preview */}
        <div className="relative w-full aspect-square rounded-none overflow-hidden bg-neutral-50 border border-neutral-200">
          <Image
            src={data.imageUrl}
            alt="customer-review-full"
            fill
            sizes="(max-width: 640px) 100vw, 500px"
            className="object-contain"
          />
        </div>

        {/* Attached Comment */}
        {data.comment && (
          <div className="p-4 bg-neutral-50 rounded-none border border-neutral-200 text-xs text-neutral-800 leading-relaxed font-normal">
            &ldquo;{data.comment}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
};
