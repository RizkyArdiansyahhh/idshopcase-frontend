import { ImageUp, Pencil } from "lucide-react";
import Image from "next/image";
import { RefObject } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

type CustomInputImageProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  imageUrl?: string;
};

type CustomInputImagePlaceholderProps = {
  inputRefPlaceholder: HTMLInputElement | null;
  imageUrl?: string;
};

export const CustomInputImage = (props: CustomInputImageProps) => {
  const { inputRef } = props;
  return (
    <>
      <div
        className="w-full h-40 border border-dashed flex flex-col justify-center rounded-md items-center p-0 hover:bg-foreground/5 cursor-pointer transition-all ease-in duration-100"
        onClick={() => inputRef.current?.click()}
      >
        <MdOutlineFileUpload size={30} className="text-foreground/70" />
        <span className="mt-1 text-xs text-foreground">
          Pilih 1 atau lebih gambar produk
        </span>
        <span className="text-xs text-gray-600">
          rekomendasi: 1:1, dibawah 2mb{" "}
        </span>
      </div>
    </>
  );
};

export const CustomImageInputPLaceholder = ({
  inputRefPlaceholder,
  imageUrl,
}: CustomInputImagePlaceholderProps) => {
  return (
    <div
      className="w-full h-12 border border-dashed rounded-sm hover:bg-foreground/5 transition-all ease-in duration-100 relative cursor-pointer flex items-center justify-center"
      onClick={() => {
        if (inputRefPlaceholder) {
          inputRefPlaceholder.click();
        } else {
          console.warn("Ref belum tersedia");
        }
      }}
    >
      <ImageUp size={30} className="text-foreground/70" />
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt="image-label"
            fill
            className="object-cover"
          />
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <div className="rounded-full p-2 bg-foreground/80">
              <Pencil className="text-background" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
