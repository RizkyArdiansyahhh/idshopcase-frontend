import { RefObject } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

type CustomInputImageProps = {
  inputRef: RefObject<HTMLInputElement | null>;
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
