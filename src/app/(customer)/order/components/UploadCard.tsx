"use client";

import { useRef } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

type UploadCardDynamicProps = {
  slotCount: number; // jumlah slot upload
  previewImages?: (string | null)[];
  onFilesSelect: (index: number, file: File) => void;
  onRemove?: (index: number) => void;
};

export const UploadCardDynamic = ({
  slotCount,
  previewImages = [],
  onFilesSelect,
  onRemove,
}: UploadCardDynamicProps) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFilesSelect(idx, file);

    // reset input agar bisa memilih file yang sama lagi
    if (refs.current[idx]) refs.current[idx]!.value = "";
  };

  return (
    <Card className="border border-gray-300 bg-white dark:bg-neutral-900 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Upload Desain Custom
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: slotCount }).map((_, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center gap-2"
            >
              <div
                onClick={() => refs.current[idx]?.click()}
                className="border-2 border-dashed border-gray-400 hover:border-gray-600 transition-all duration-200 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer w-24 h-24 bg-gray-50 hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 relative"
              >
                {previewImages[idx] ? (
                  <img
                    src={previewImages[idx]!}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <Upload className="h-6 w-6 text-gray-500" />
                )}

                <input
                  ref={(el) => {
                    refs.current[idx] = el;
                  }}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleChange(e, idx)}
                />

                {/* Tombol Hapus di pojok */}
                {previewImages[idx] && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // agar klik tombol tidak memicu open file dialog
                      onRemove?.(idx);
                    }}
                    className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
