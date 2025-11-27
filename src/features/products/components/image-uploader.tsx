"use client";

import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { ImageUp } from "lucide-react";

type ImageItem = File;

type ImageUploaderProps = {
  value: ImageItem[];
  onChange: (files: ImageItem[]) => void;
};

export function ImageUploader({ value = [], onChange }: ImageUploaderProps) {
  const maxSize = 5 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => allowedTypes.includes(file.type) && file.size <= maxSize
      );
      onChange(validFiles); // replace semua file lama
    },
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
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
            <p>Drag & drop gambar di sini, atau klik untuk pilih file</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {value.map((file, idx) => {
          const url = URL.createObjectURL(file);
          return (
            <div key={idx} className="relative w-24 h-24">
              <div className="w-24 h-24 overflow-hidden rounded-md border relative">
                <Image
                  src={url}
                  alt={`preview-${idx}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {idx === 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs">Default</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="absolute -top-2 -right-2 p-1 bg-white border rounded-full shadow"
                onClick={() => removeImage(idx)}
              >
                <IoMdClose size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
