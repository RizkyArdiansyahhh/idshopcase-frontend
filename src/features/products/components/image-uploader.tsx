"use client";

import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { ImageUp } from "lucide-react";

type ImageItem = File | string; // File baru atau URL string

type ImageUploaderProps = {
  value: ImageItem[];
  onChange: (files: ImageItem[]) => void;
};

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const [previews, setPreviews] = useState<string[]>([]);

  // Generate preview URLs
  useEffect(() => {
    const urls = value.map((item) =>
      typeof item === "string" ? item : URL.createObjectURL(item)
    );
    setPreviews(urls);

    // Revoke object URLs ketika unmount / update
    return () => {
      urls.forEach((url) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!value.includes(url as any)) URL.revokeObjectURL(url);
      });
    };
  }, [value]);

  const onDrop = (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        console.warn(`File ditolak (tipe tidak valid): ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        console.warn(`File ditolak (terlalu besar): ${file.name}`);
        return false;
      }
      return true;
    });

    onChange([...value, ...validFiles]); // merge images
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
          isDragActive ? "bg-gray-100 border-black" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm text-gray-700">Lepaskan gambar…</p>
        ) : (
          <div className="text-sm flex flex-col items-center text-gray-600">
            <ImageUp size={50} className="text-foreground/50" />
            <p>Unggah Gambar</p>
            <p>Maksimal 5MB</p>
            <p className=" ">
              Drag & drop gambar di sini, atau klik untuk pilih file
            </p>
          </div>
        )}
      </div>

      {/* PREVIEW */}
      <div className="flex flex-wrap gap-3">
        {previews.map((previewUrl, index) => (
          <div key={index} className="relative w-24 h-24">
            <div className="w-24 h-24 overflow-hidden rounded-md border relative">
              <Image
                src={previewUrl}
                alt={`image-${index}`}
                fill
                unoptimized
                className="object-cover"
              />
              {index === 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs">Default</span>
                </div>
              )}
            </div>

            {/* DELETE BUTTON */}
            <button
              type="button"
              className="absolute -top-2 -right-2 p-1 bg-white border rounded-full shadow"
              onClick={() => removeImage(index)}
            >
              <IoMdClose size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
