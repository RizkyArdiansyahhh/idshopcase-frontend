"use client";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Link from "next/link";
import { Combobox } from "./components/combo-box";
import { ShoppingCart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const pathVariants = [
  "varian-1.png",
  "varian-2.png",
  "varian-3.png",
  "varian-4.png",
];
const materials = [
  "Premium Softcase",
  "Diamond Impact",
  "Magsafe Diamond Impact X2",
];
const DetailProductPage = () => {
  return (
    <>
      <div className="w-full h-full py-5 flex flex-row ">
        <div className="w-[45%] h-full ">
          <div className="w-full h-full flex flex-col">
            <div className="h-2/3 w-full ">
              <div className="w-1/2 mx-auto h-full  relative">
                <Image
                  src={"/images/banner-detail-product.png"}
                  alt="banner-detail-product"
                  fill
                  className="object-center object-cover"
                ></Image>
              </div>
            </div>
            <div className="h-1/3 w-full  grid grid-cols-4">
              {pathVariants.map((variant, index) => {
                return (
                  <div key={index} className="relative ">
                    <Image
                      src={`/images/detail-product/${variant}`}
                      alt={`variant-${index}`}
                      fill
                      className="object-center object-cover opacity-50 hover:opacity-100 duration-200 ease-in-out transition-all cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-[55%] h-full px-8 flex flex-col gap-2.5">
          <h1 className="text-4xl font-semibold text-foreground">
            case iphone 16 pro max custom
          </h1>
          <h3 className="text-3xl font-medium text-foreground/70">
            Rp 145.000 - Rp 200.000
          </h3>
          <p className="text-app-light-sm leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            necessitatibus beatae dolores vitae ad reiciendis vero, illo
            dignissimos nostrum fuga.
          </p>

          {/* FORM */}
          <div className="flex flex-col gap-7">
            <div className="grid grid-cols-4 bg-gradient-to-r from-transparent to-foreground/10 py-3 pr-3 rounded-sm">
              <p className="text-app-semibold-sm">Pengiriman</p>
              <p className="text-app-light-sm col-span-2">JNE Reguler</p>
              <div className="flex justify-end">
                <Link
                  className="text-app-semibold-sm cursor-pointer hover:underline transition-all duration-150 ease-in-out"
                  href=""
                >
                  Ubah
                </Link>
              </div>
            </div>
            <div>
              <p className="text-app-semibold-sm mb-2">Material</p>
              <RadioGroup className="grid-cols-3">
                {materials.map((material, index) => {
                  return (
                    <FieldLabel key={index} className="relative">
                      <Field orientation={"horizontal"}>
                        <FieldTitle className="text-xs">{material}</FieldTitle>
                        <RadioGroupItem
                          className="opacity-0 absolute"
                          value={material}
                          id={material.trim()}
                        ></RadioGroupItem>
                      </Field>
                    </FieldLabel>
                  );
                })}
              </RadioGroup>
            </div>
            {/* COMBO BOX */}
            <Combobox></Combobox>
            <div className="max-w-1/3  border border-foreground flex flex-row justify-between items-center">
              <div className="px-5  font-semibold text-xs">
                Custom Your Image
              </div>
              <div className="bg-foreground p-1.5">
                <Upload color="white" />
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
            {/* BUTTON */}
            <div className="flex flex-row gap-3">
              <Button
                variant={"outline"}
                className="text-foreground rounded-none p-7 border-foreground"
              >
                <ShoppingCart />
                <span className="mx-2">Masukkan Keranjang</span>
              </Button>
              <Button
                variant={"default"}
                className="text-background rounded-none py-7 px-10 border-foreground"
              >
                <span className="mx-2">Beli Sekarang</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
