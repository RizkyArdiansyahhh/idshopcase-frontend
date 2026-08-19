"use client";

import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { ImageUp, Trash2 } from "lucide-react";
import { cleanImageUrl } from "@/utils/image-utils";
import { toast } from "sonner";

export type ExistingImageItem = {
  id: string | number;
  imageUrl: string;
  isPrimary?: boolean;
};

type ImageUploaderProps = {
  existingImages?: ExistingImageItem[];
  onRemoveExisting?: (id: string | number) => void;
  value: File[];
  onChange: (files: File[]) => void;
  maxImages?: number;
};

export function ImageUploader({
  existingImages = [],
  onRemoveExisting,
  value = [],
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const maxSize = 5 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const currentTotal = existingImages.length + value.length;
  const remainingSlots = Math.max(0, maxImages - currentTotal);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => allowedTypes.includes(file.type) && file.size <= maxSize
      );

      if (validFiles.length === 0) return;

      if (validFiles.length > remainingSlots) {
        toast.error(`Maksimal hanya dapat menambahkan ${remainingSlots} gambar lagi.`);
      }

      const filesToAdd = validFiles.slice(0, remainingSlots);
      onChange([...value, ...filesToAdd]);
    },
    accept: { "image/*": [] },
    multiple: true,
    disabled: remainingSlots <= 0,
  });

  const removeNewImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
          remainingSlots <= 0
            ? "bg-muted/40 border-muted-foreground/20 cursor-not-allowed opacity-60"
            : isDragActive
              ? "bg-primary/5 border-primary"
              : "border-muted-foreground/30 hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        {remainingSlots <= 0 ? (
          <p className="text-xs text-muted-foreground">
            Batas maksimal ({maxImages} gambar) telah tercapai. Hapus gambar yang ada untuk menambahkan gambar baru.
          </p>
        ) : isDragActive ? (
          <p className="text-sm font-medium text-primary">Lepaskan gambar di sini…</p>
        ) : (
          <div className="text-xs font-light flex flex-col items-center text-muted-foreground gap-1">
            <ImageUp size={36} className="text-foreground/30 mb-1" />
            <p className="font-semibold text-foreground">
              Tarik & lepas gambar di sini, atau klik untuk memilih file
            </p>
            <p>Maksimal 5MB per file • Format: .jpg, .png, .webp</p>
            <p className="text-[11px] text-foreground/50 mt-1">
              Tersisa slot: <span className="font-bold text-foreground">{remainingSlots}</span> dari {maxImages} gambar
            </p>
          </div>
        )}
      </div>

      {/* Grid Thumbnail Gambar (Existing + Baru) */}
      {(existingImages.length > 0 || value.length > 0) && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground">
            Gambar Terpasang ({currentTotal}/{maxImages}):
          </p>

          <div className="flex flex-wrap gap-3">
            {/* 1. Render Existing Images dari Database */}
            {existingImages.map((img, idx) => {
              const url = cleanImageUrl(img.imageUrl);
              return (
                <div key={`existing-${img.id}`} className="relative w-24 h-24 group">
                  <div className="w-24 h-24 overflow-hidden rounded-lg border-2 border-border relative bg-muted shadow-xs">
                    <Image
                      src={url}
                      alt={`existing-${img.id}`}
                      fill
                      className="object-cover"
                    />
                    {img.isPrimary && (
                      <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        Utama
                      </div>
                    )}
                  </div>

                  {/* Tombol Hapus Gambar Existing */}
                  {onRemoveExisting && (
                    <button
                      type="button"
                      title="Hapus gambar ini"
                      className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full shadow-md transition transform hover:scale-110 z-10"
                      onClick={() => onRemoveExisting(img.id)}
                    >
                      <IoMdClose size={14} />
                    </button>
                  )}
                </div>
              );
            })}

            {/* 2. Render New Uploaded Files (Belum disimpan) */}
            {value.map((file, idx) => {
              const url = URL.createObjectURL(file);
              const isFirstOverall = existingImages.length === 0 && idx === 0;

              return (
                <div key={`new-${idx}`} className="relative w-24 h-24 group">
                  <div className="w-24 h-24 overflow-hidden rounded-lg border-2 border-primary/50 relative bg-muted shadow-xs">
                    <Image
                      src={url}
                      alt={`new-preview-${idx}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
                      Baru
                    </div>
                    {isFirstOverall && (
                      <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        Utama
                      </div>
                    )}
                  </div>

                  {/* Tombol Hapus File Baru */}
                  <button
                    type="button"
                    title="Batal unggah file ini"
                    className="absolute -top-2 -right-2 p-1.5 bg-background border hover:bg-muted text-foreground rounded-full shadow-md transition transform hover:scale-110 z-10"
                    onClick={() => removeNewImage(idx)}
                  >
                    <IoMdClose size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
