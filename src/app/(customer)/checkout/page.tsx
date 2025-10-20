import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const CheckOutPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 py-2">
      <div className="w-full h-[30%] bg border rounded-xs grid grid-cols-6 p-10">
        <p className="text-lg font-semibold text-foreground col-span-2">
          Pengiriman
        </p>
        <div className="col-span-3">
          <p className="text-lg font-medium text-foreground">Regular</p>
          <div className="font-light text-xs">
            <p>Garansi Tiba : 27 - 29 Jul</p>
            <p>Voucher s/d Rp10.000 jika pesanan belum tiba 29 Jul 2025.</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[10%] bg border rounded-xs grid grid-cols-6 px-10 py-1">
        <p className="text-lg font-semibold text-foreground col-span-2">
          Alamat Pengiriman
        </p>
        <div className="col-span-3">
          <p className="text-lg font-medium text-foreground">Regular</p>
          <div className="font-light text-xs">
            <p>
              Jalan Jend Sudirman, Rt 14/Rw 1, Bendungan Hilir, G, KAB. BOGOR -
              CIAMPEA, JAWA BARAT, ID 16623
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="font-semibold text-lg" variant={"link"}>
            Ubah
          </Button>
        </div>
      </div>
      <div className="w-full h-[30%] bg border rounded-xs grid grid-cols-4 px-10 py-12">
        <div className="col-span-3 flex flex-row gap-4">
          <div className="relative w-[12%] h-full">
            <Image
              src={"/images/product-2.jpeg"}
              alt="checkout-image"
              fill
              className="object-cover object-center"
            ></Image>
          </div>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                case iphone 16 pro max custom
              </h2>
              <p className="text-xs font-light">Material Diamond Impact</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-foreground">Rp 120000</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-app-semibold-sm">Jumlah</p>
          <div className=" flex-row-center  px-10">
            <div className="grid grid-cols-4">
              <Button
                variant={"outline"}
                className="col-span-1 text-foreground rounded-none border-foreground"
              >
                <IoMdRemove />
              </Button>
              <div className="col-span-2 border border-foreground flex-row-center ">
                <p>1</p>
              </div>
              <Button
                variant={"outline"}
                className="col-span-1 text-foreground rounded-none border-foreground"
              >
                <IoMdAdd />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <div className="w-full h-[30%] bg border rounded-xs flex flex-col">
        <div className="h-2/6 w-full px-10 flex flex-row justify-between items-center">
          <p className="text-lg font-semibold text-foreground col-span-2">
            Pengiriman
          </p>
          <div className="flex flex-row items-center">
            <p className="text-lg font-light text-foreground">PAYPAL</p>
            <Button variant={"link"} className="font-semibold text-lg">
              Ubah
            </Button>
          </div>
        </div>
        <Separator orientation={"horizontal"}></Separator>
        <div className="flex justify-end items-center flex-1 px-10">
          <div className="flex flex-col gap-2 w-1/5">
            <div>
              <span>Total Pembayaran :</span>
              <span className="text-lg font-bold"> Rp 120000</span>
            </div>
            <Button
              variant={"default"}
              className="text-background rounded-none py-7 px-10 border-foreground"
            >
              <span className="mx-2">Buat Pesanan</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
