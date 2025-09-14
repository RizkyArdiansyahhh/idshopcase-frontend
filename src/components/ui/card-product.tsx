import Image from "next/image";

export const CardProduct = () => {
  return (
    <div className="w-[280px] h-80 p-4 border-black border-2 rounded-[12px]">
      <div className="relative w-full h-5/6 rounded-[12px] overflow-hidden">
        <Image src={"/images/product-2.jpeg"} alt="product-1" fill />
      </div>
      <div className="w-full h-1/6 flex items-center justify-center">
        <p className="font-medium text-xl ">Product 1</p>
      </div>
    </div>
  );
};
