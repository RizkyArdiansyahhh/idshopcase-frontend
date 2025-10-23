"use client";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Combobox } from "./components/combo-box";
import { ShoppingCart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FormCheckout } from "@/features/checkout/components/form-checkout";
import { Separator } from "@/components/ui/separator";

const pathVariants = ["default.png", "black.png", "green.png", "blue.png"];
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
                      className="object-center object-cover opacity-50 hover:opacity-65 duration-200 ease-in-out transition-all cursor-pointer"
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
            <div>
              <Separator orientation="horizontal" className="my-2"></Separator>

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
            <Combobox className="mb-0"></Combobox>
            <div className="max-w-1/3  border border-foreground flex flex-row justify-between items-center">
              <div className="px-5  font-semibold text-xs">
                Custom Your Image
              </div>
              <div className="bg-foreground p-1.5">
                <Upload color="white" />
              </div>
            </div>
            <Separator orientation="horizontal" className="my-2"></Separator>
            {/* BUTTON */}
            <div className="flex flex-row gap-3">
              <FormCheckout materials={materials} variant="outline">
                <ShoppingCart />
                <span className="mx-2">Masukkan Keranjang</span>
              </FormCheckout>
              <FormCheckout materials={materials} variant="default">
                <span className="mx-2">Beli Sekarang</span>
              </FormCheckout>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
