"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";
import { CiGrid2H, CiGrid2V, CiGrid41 } from "react-icons/ci";

const CollectionsPage = () => {
  //   const [layoutActive, setLayoutActive] = useState("grid-3");
  return (
    <div className="w-screen h-fit">
      <div className="w-full h-[40vh] relative">
        <Image
          src={"/images/banner-collection.jpeg"}
          fill
          alt="banner"
          className="object-cover object-center"
        ></Image>

        <div className="w-[90%] h-20 bg-white z-10 absolute  bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border rounded-md shadow-md p-2 flex justify-between items-center px-4">
          <p className="text-3xl font-black">Koleksi IdshopCase</p>
          <div className="rounded-full bg-transparent p-2 flex flex-row gap-2 border-2 border-foreground">
            <Button
              variant={"outline"}
              size={"icon-lg"}
              className="rounded-full bg-background "
            >
              <CiGrid2H className="text-2xl" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon-lg"}
              className="rounded-full bg-background "
            >
              <CiGrid2V className="text-2xl" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon-lg"}
              className="rounded-full bg-background "
            >
              <CiGrid41 className="text-2xl" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-8 pt-14">
        <div className="h-fit w-1/5 border p-3 rounded-md">
          <p className="font-semibold text-xl">Kategori</p>
          <div>
            <p>Semua Produk</p>
            <div className="flex flex-row h-25 py-1  items-start gap-4">
              <Separator orientation="vertical" className="h-full" />
              <div>
                <div className="flex flex-row">
                  <p>Custom Case</p>
                </div>
                <p>Keychain</p>
                <p>Pop Charm</p>
                <p>Pop Socket</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen w-3/5"></div>
      </div>
    </div>
  );
};

export default CollectionsPage;
