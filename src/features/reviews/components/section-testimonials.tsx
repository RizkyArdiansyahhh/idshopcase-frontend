"use client";

import { useRandomReviews } from "../api/get-random-reviews";
import { ReviewCard } from "./review-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaStar } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useState } from "react";

export const SectionTestimonials = () => {
  const [limit] = useState(9);
  const { data: reviews, isLoading, isFetching, refetch } = useRandomReviews({
    limit,
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/80 dark:bg-muted border border-border/60 text-xs font-semibold text-foreground">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="size-3 text-foreground" />
            ))}
          </div>
          <span>4.9 / 5.0 Rating Kepuasan Pelanggan</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          Apa Kata Mereka Tentang Kami?
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Ulasan jujur langsung dari ribuan pembeli terverifikasi yang telah merasakan kualitas bahan, ketajaman cetak, dan presisi custom case Idshopcase.
        </p>

        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="rounded-full gap-2 text-xs font-semibold hover:bg-foreground hover:text-background transition-all"
          >
            <LuRefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Memuat Ulasan..." : "Acak Ulasan Lainnya"}
          </Button>
        </div>
      </div>

      {/* Reviews Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[200px] p-5 rounded-2xl border border-border/40 space-y-4 bg-muted/20"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Belum ada ulasan yang ditampilkan.
        </div>
      )}
    </section>
  );
};
