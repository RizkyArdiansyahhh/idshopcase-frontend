import { CreditCard, PackageCheck, Truck } from "lucide-react";
import Image from "next/image";

type CardOrderProps = {
  productName: string;
  price: number;
  status: string;
};

export const CardOrder = (props: CardOrderProps) => {
  const { productName, price, status } = props;
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-[12%] h-30 border-2 border-foreground rounded-sm relative overflow-hidden ">
          <Image
            src={"/images/product-1.jpeg"}
            alt="product-1"
            fill
            className={"object-cover "}
          ></Image>
        </div>
        <div
          className="flex-1 h-24  self-center bg-gradient-to-r
        from-foreground/10 to-transparent flex flex-row justify-around"
        >
          <div className="w-[21.3333%] flex flex-col justify-center">
            <p className="text-app-semibold-sm">{productName}</p>
            <p className="text-sm font-light text-foreground/60">Iphone 12</p>
          </div>
          <p className="w-1/3  self-center text-center text-app-semibold-sm">
            Rp.
            {price}
          </p>
          <div className="w-1/3  px-5 flex flex-row justify-between items-center text-app-semibold-sm">
            <p>{status}</p>
            {status === "pending" && <CreditCard />}
            {status === "shipped" && <Truck />}
            {status === "completed" && <PackageCheck />}
          </div>
        </div>
      </div>
    </>
  );
};
