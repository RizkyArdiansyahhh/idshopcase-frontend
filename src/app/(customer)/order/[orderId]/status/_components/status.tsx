import { Separator } from "@/components/ui/separator";
import { CircleCheckBig } from "lucide-react";

export const Status = () => {
  return (
    <div className="flex flex-col items-center w-full py-2">
      <div className="p-3 rounded-md bg-foreground w-fit">
        <CircleCheckBig size={60} className="text-background" />
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground text-center">
          Yeay! Pembayaran Berhasil
        </h1>
        <p className="text-center text-xl font-light">
          Pesanan Anda telah berhasil dibayar dan akan segera diproses
        </p>
      </div>
      <div className="w-1/2 h-fit bg-background rounded-sm">
        <div className="p-8">
          <h3 className="text-lg font-semibold">Detail Pesanan</h3>
          <Separator className="my-2"></Separator>
          <div className="font-medium text-md flex flex-col gap-1">
            <div className=" flex flex-row justify-between items-center">
              <p className="text-foreground/60  ">Nomor Pesanan :</p>
              <span className="text-foreground ">ORD123456</span>
            </div>
            <div className=" flex flex-row justify-between items-center ">
              <p className="text-foreground/60">Tanggal Pesanan :</p>
              <span className="text-foreground">20 Januari 2023</span>
            </div>
            <div className=" flex flex-row justify-between items-center">
              <p className="text-foreground/60">Metode Pembayaran :</p>
              <span className="text-foreground">DOKU Checkout</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-15 my-5">
          <div className="w-6 h-12 rounded-tr-full rounded-br-full bg-foreground/5" />
          <div className="border-t-2 border-dashed border-foreground" />
          <div className="w-6 h-12 rounded-tl-full rounded-bl-full bg-foreground/5" />
        </div>
        <div className="w-full flex justify-end px-8 pb-8">
          <div className="w-1/3">
            <div className=" flex flex-row justify-between items-center">
              <p className="text-foreground/60  ">Sub Total :</p>
              <span className="text-foreground font-semibold">Rp. 20.000</span>
            </div>
            <div className=" flex flex-row justify-between items-center">
              <p className="text-foreground/60  ">Total :</p>
              <span className="text-foreground font-semibold">Rp. 20.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
