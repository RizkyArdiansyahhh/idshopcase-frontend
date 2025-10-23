import { Combobox } from "@/app/(customer)/products/detail/[id]/components/combo-box";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";
import Image from "next/image";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import z from "zod";

type FormCheckoutProps = {
  materials: string[];
  children: React.ReactNode;
  variant: "default" | "outline";
};
export const FormCheckout = (props: FormCheckoutProps) => {
  const { materials, children, variant } = props;
  const formCheckoutSchema = z.object({
    material: z.string({ message: "Material is required" }),
  });
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={variant} className="p-7 rounded-none">
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="mx-auto w-full max-w-4xl">
          <div className="w-full h-[25rem] flex flex-row">
            <div className="w-1/3 h-full relative p-2">
              <Image
                src={"/images/banner-detail-product.png"}
                alt="banner-detail-product"
                fill
                className="object-center object-cover scale-90"
              ></Image>
            </div>
            <div className="w-2/3 h-full ">
              <p className="font-semibold mb-2">
                <span className="text-xl">Rp</span>
                <span className="text-3xl">150.000</span>
              </p>
              <p className="text-md text-foreground/50 font-medium">
                Stok : 10
              </p>
              <Separator orientation="horizontal" className="my-2"></Separator>
              <div className="my-1">
                <span className="text-xs font-medium text-foreground/50">
                  Material
                </span>
              </div>
              <RadioGroup className="grid-cols-3 mb-2">
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
              <Separator orientation="horizontal" className="my-2"></Separator>
              <Combobox className="border-foreground/10"></Combobox>
              <Separator orientation="horizontal" className="mb-2"></Separator>
              <div className="max-w-1/3  border border-foreground/10 flex flex-row justify-between items-center">
                <div className="px-5  font-semibold text-xs">
                  Custom Your Image
                </div>
                <div className="bg-foreground py-3 h-full px-2 flex items-center">
                  <Upload color="white" size={20} />
                </div>
              </div>
              <Separator orientation="horizontal" className="my-2"></Separator>
              <div className="flex flex-row items-center justify-between">
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
            </div>
          </div>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
