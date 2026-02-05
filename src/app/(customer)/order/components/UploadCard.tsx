"use client";

import { useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { AlertMessage } from "@/components/shared/alert-message";

type UploadCardDynamicProps = {
  slotCount: number; // jumlah slot upload
  previewImages?: (string | null)[];
  onFilesSelect: (index: number, file: File) => void;
  onRemove?: (index: number) => void;
  isImageValid?: boolean;
};

export const UploadCardDynamic = ({
  slotCount,
  previewImages = [],
  onFilesSelect,
  onRemove,
  isImageValid,
}: UploadCardDynamicProps) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFilesSelect(idx, file);
    if (refs.current[idx]) refs.current[idx]!.value = "";
  };

  return (
    <Card className="border border-gray-300 bg-white dark:bg-neutral-900 rounded-xl shadow-sm">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="text-xs md:text-sm lg:text-base font-medium text-gray-900 dark:text-gray-100">
            Upload Desain Custom
          </CardTitle>
          <p className="text-xs md:text-sm">{`(Maks. ${slotCount} gambar)`}</p>
        </div>
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
                className="border-2 border-dashed border-gray-400 hover:border-gray-600 transition-all duration-200 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer w-16 h-16 md:w-24 md:h-24 bg-gray-50 hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 relative"
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
                      e.stopPropagation();
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
      <CardFooter>
        {!isImageValid && (
          <AlertMessage
            variant="danger"
            message="Masukkan Minimal 1 Gambar Sebagai Kebutuhan Pesanan"
            clasname="w-full"
          ></AlertMessage>
        )}
      </CardFooter>
    </Card>
  );
};
