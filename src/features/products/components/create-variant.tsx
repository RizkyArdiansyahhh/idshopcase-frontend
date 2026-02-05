import { UseFormReturn } from "react-hook-form";
import { useCreateVariant } from "../api/create-variant";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/lib/format-currency";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BrushCleaning } from "lucide-react";
import { Variant } from "@/types/api";
import { useEffect } from "react";
import { useUpdateVariant } from "../api/update-variant";

type CreateVariantProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  activeVariant: Variant | null;
  setActiveVariant: (id: number | null) => void;
};

export function CreateVariant({
  form,
  activeVariant,
  setActiveVariant,
}: CreateVariantProps) {
  // ambil function createVariant dari hook API
  const { mutate: createVariant, isPending: createVariantIsPending } =
    useCreateVariant();
  const { mutate: updateVariant, isPending: updateVariantIsPending } =
    useUpdateVariant();

  const resetVariantForm = () => {
    setActiveVariant(null);
    form.setValue("nameVariant", "");
    form.setValue("priceVariant", "");
    form.setValue("stockVariant", "");
    form.setValue("maxImagesVariant", "");
  };

  const [name, price, stock, maxImages] = form.watch([
    "nameVariant",
    "priceVariant",
    "stockVariant",
    "maxImagesVariant",
  ]);
  const isVariantFormInvalid = !name || !price || !stock || !maxImages;

  useEffect(() => {
    if (!activeVariant) return;

    form.setValue("nameVariant", activeVariant.name);
    form.setValue("priceVariant", String(activeVariant.price));
    form.setValue("stockVariant", String(activeVariant.stock));
    form.setValue("maxImagesVariant", String(activeVariant.max_images));
  }, [activeVariant, form]);

  const handleSubmitVariant = () => {
    const values = form.getValues();

    if (activeVariant) {
      updateVariant(
        {
          id: activeVariant.id,
          data: {
            name: values.nameVariant,
            price: values.priceVariant,
            stock: values.stockVariant,
            max_images: values.maxImagesVariant,
          },
        },
        { onSuccess: () => resetVariantForm() },
      );
    } else {
      createVariant(
        {
          name: values.nameVariant,
          price: values.priceVariant,
          stock: values.stockVariant,
          max_images: values.maxImagesVariant,
        },
        {
          onSuccess: (newVariant) => {
            const currentVariants = form.getValues("variant") || [];
            form.setValue("variant", [...currentVariants, newVariant.data.id]);
            resetVariantForm();
          },
        },
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1">
          <FormField
            name="nameVariant"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between">
                  <FormLabel>Label Variant</FormLabel>
                  <Button
                    className={`p-1 rounded-full border bg-background border-foreground group hover:bg-foreground/80  hover:cursor-pointer hover:shadow-2xl transition-all ease-in duration-100 h-7 w-7`}
                    disabled={isVariantFormInvalid}
                    onClick={() => resetVariantForm()}
                  >
                    <BrushCleaning
                      size={16}
                      className="text-foreground/80 group-hover:text-white"
                    />
                  </Button>
                </div>
                <Input
                  type="text"
                  placeholder="Label Variant"
                  {...field}
                  value={field.value || ""}
                />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-5">
          <FormField
            name="priceVariant"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga</FormLabel>
                <div className="relative">
                  <Input
                    type="text"
                    {...field}
                    value={formatNumber(Number(field.value || "0"))}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      field.onChange(raw);
                    }}
                    placeholder="Harga"
                  />
                  <span className="absolute top-1/2 right-2 -translate-y-1/2 font-medium text-foreground/50">
                    IDR
                  </span>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="stockVariant"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stok</FormLabel>
                <div className="relative">
                  <Input
                    type="text"
                    {...field}
                    value={formatNumber(field.value)}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value.replace(/\D/g, "")))
                    }
                    placeholder="Stok"
                  />
                  <span className="absolute top-1/2 right-2 -translate-y-1/2 font-medium text-foreground/50">
                    pcs
                  </span>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="maxImagesVariant"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Images</FormLabel>
                <Input
                  type="text"
                  {...field}
                  value={formatNumber(field.value)}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value.replace(/\D/g, "")))
                  }
                  placeholder="Max Images"
                />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSubmitVariant}
            disabled={
              isVariantFormInvalid ||
              createVariantIsPending ||
              updateVariantIsPending
            }
          >
            {createVariantIsPending || updateVariantIsPending ? (
              <Spinner />
            ) : activeVariant ? (
              "Update Variant"
            ) : (
              "Tambah Variant"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
