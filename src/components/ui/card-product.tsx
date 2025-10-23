"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
type CardProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
};
export const CardProduct = (props: CardProductType) => {
  const { push } = useRouter();

  const { id, name, price, image } = props;
  return (
    <div
      className="w-[280px] h-80 p-4 border-black border-2 rounded-[12px]"
      onClick={() => push(`/products/detail/${id}`)}
    >
      <div className="relative w-full h-5/6 rounded-[12px] overflow-hidden">
        <Image src={image} alt="product-1" fill />
      </div>
      <div className="w-full h-1/6 flex items-center justify-center">
        <p className="font-medium text-xl ">{name}</p>
      </div>
    </div>
  );
};
