import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { CartList } from "@/features/cart/components/cart-list";
import Link from "next/link";

export const Cart = () => {
  return (
    <>
      <div className="h-full w-full flex flex-row py-10">
        <div className="h-full w-full flex flex-col gap-2">
          <div className="w-full border rounded-sm py-3 px-7 flex flex-row justify-around">
            {["Produk", "Harga Satuan", "Kuantitas", "Total Harga", "Aksi"].map(
              (item, index) => {
                return (
                  <p
                    key={index}
                    className={`${
                      index === 0 ? "w-4/12" : "w-2/12 text-center"
                    }   font-semibold text-foreground/50`}
                  >
                    {item}
                  </p>
                );
              }
            )}
          </div>
          <CartList></CartList>
          <div className="fixed z-20 bottom-0 w-[93%] px-5 py-10 bg-secondary-foreground/75 rounded-t-[12px]">
            <div className="flex flex-row justify-between items-center">
              <div>
                <Field orientation={"horizontal"}>
                  <Checkbox
                    id="selectedAll"
                    className="rounded-none bg-background"
                    data-slot="field-content"
                  />
                  <FieldLabel
                    htmlFor="selectedAll"
                    className="text-app-semibold-sm text-background"
                  >
                    Pilih Semuanya (3)
                  </FieldLabel>
                </Field>
              </div>
              <div className="flex-row-center gap-4 ">
                <p className="text-app-semibold-sm text-background">
                  Total (0 Produk)
                </p>
                <p className="text-app-semibold-lg text-background">Rp. 0</p>
                <Link
                  href="/checkout"
                  className="bg-background rounded-md p-3 text-foreground font-semibold px-10 hover:text-foreground/80 transition-colors duration-300 ease-in-out"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
