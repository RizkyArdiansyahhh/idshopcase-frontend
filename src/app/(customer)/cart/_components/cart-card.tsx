import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

type CartCardProps = {
  id: string;
  name: string;
  material: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
  //   handleIncrementQuantity: () => void;
  //   handleDecrementQuantity: () => void;
  //   handleDeleteProduct: () => void;
};

export const CartCard = (props: CartCardProps) => {
  const {
    id,
    name,
    material,
    price,
    quantity,
    image,
    selected,
    // handleIncrementQuantity,
    // handleDecrementQuantity,
    // handleDeleteProduct,
  } = props;
  return (
    <div className="w-full border rounded-sm py-3 px-7 flex flex-row justify-around">
      <div className="w-4/12 flex flex-row items-center gap-2">
        <Checkbox id={id} />
        <div className="w-full flex flex-row gap-2">
          <div className="w-1/4 h-28 relative">
            <Image src={image} alt={name} fill className="object-cover"></Image>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <Link href={"#"} className="text-app-semibold-xl">
              {name}
            </Link>
            <p className="text-sm font-light text-foreground/60">{material}</p>
          </div>
        </div>
      </div>
      <p className="w-2/12 self-center text-center text-app-semibold-lg">
        Rp. {price}
      </p>
      <div className="w-2/12 flex-row-center  px-10">
        <div className="grid grid-cols-4">
          <Button
            variant={"outline"}
            className="col-span-1 text-foreground rounded-none"
          >
            <IoMdRemove />
          </Button>
          <div className="col-span-2 border flex-row-center ">
            <p>1</p>
          </div>
          <Button
            variant={"outline"}
            className="col-span-1 text-foreground rounded-none"
          >
            <IoMdAdd />
          </Button>
        </div>
      </div>
      <p className="w-2/12 self-center text-center text-app-semibold-lg">
        Rp. {price * quantity}
      </p>
      <div className="w-2/12 flex-row-center">
        <FaTrash size={24} color="red" className="hover:cursor-pointer" />
      </div>
    </div>
  );
};
