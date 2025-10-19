import { cartItems } from "@/mocks/chart-items";
import { CartCard } from "./_components/cart-card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  return (
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
        <div className="w-full flex flex-col gap-2">
          {cartItems.map((item) => {
            return <CartCard key={item.id} {...item}></CartCard>;
          })}
        </div>
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
                  Pilih Semua (3)
                </FieldLabel>
              </Field>
            </div>
            <div className="flex-row-center gap-4 ">
              <p className="text-app-semibold-sm text-background">
                Total (0 Produk)
              </p>
              <p className="text-app-semibold-lg text-background">Rp. 0</p>
              <Button
                variant={"default"}
                className="bg-card text-foreground font-semibold px-10 hover:text-background"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
