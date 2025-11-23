"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon, X } from "lucide-react";

type UploadCardProps = {
  previewImage?: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
};

export const UploadCard = ({
  previewImage,
  onImageChange,
  onRemove,
}: UploadCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="border border-gray-300 bg-white dark:bg-neutral-900 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Upload Desain Custom
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!previewImage ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-400 hover:border-gray-600 transition-all duration-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            <Upload className="h-10 w-10 text-gray-500 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Seret gambar ke sini atau klik untuk upload
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG (max 2MB)</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              hidden
            />
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview desain custom"
              className="w-full h-64 object-cover rounded-lg border border-gray-200"
            />
            <button
              onClick={onRemove}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
