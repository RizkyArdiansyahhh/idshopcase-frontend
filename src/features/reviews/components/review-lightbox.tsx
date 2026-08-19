"use client";

import React from "react";
import Image from "next/image";
import { Star, X, MessageSquareQuote } from "lucide-react";

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

export const ReviewLightbox: React.FC<ReviewLightboxProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-none p-5 sm:p-6 max-w-lg w-full shadow-2xl relative space-y-4 animate-in zoom-in-95 duration-200 border border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-neutral-900">
              Foto Ulasan dari {data.username}
            </h4>
            <div className="flex items-center gap-0.5">
              {[...Array(data.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-neutral-900 text-neutral-900" />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-none border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Big Image Preview */}
        <div className="relative w-full aspect-square rounded-none overflow-hidden bg-neutral-100 border border-neutral-200">
          <Image
            src={data.imageUrl}
            alt="customer-review-full"
            fill
            sizes="(max-width: 640px) 100vw, 500px"
            className="object-contain"
          />
        </div>

        {/* Attached Comment Quote */}
        {data.comment && (
          <div className="p-3.5 bg-neutral-50 rounded-none border border-neutral-200 text-xs text-neutral-700 leading-relaxed italic flex items-start gap-2">
            <MessageSquareQuote className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <span>“{data.comment}”</span>
          </div>
        )}
      </div>
    </div>
  );
};
