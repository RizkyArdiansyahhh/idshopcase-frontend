import { UseFormReturn } from "react-hook-form";
import { useCreateVariant } from "../api/create-variant";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/lib/format-currency";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type CreateVariantProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
};

export function CreateVariant({ form }: CreateVariantProps) {
  // 🔥 ambil function createVariant dari hook API
  const { mutate: createVariant, isPending } = useCreateVariant();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1">
          <FormField
            name="nameVariant"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label Variant</FormLabel>
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
                  <FormMessage></FormMessage>
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
                  placeholder="Max Images Variant"
                  {...field}
                  value={field.value || ""}
                />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            disabled={isPending}
            onClick={() => {
              const values = form.getValues();

              // 🔥 panggil API create variant
              createVariant({
                name: values.nameVariant,
                price: values.priceVariant,
                stock: values.stockVariant,
                max_images: values.maxImagesVariant,
              });

              // 🔥 reset hanya field variant
              form.reset({
                ...form.getValues(),
                nameVariant: "",
                priceVariant: "",
                stockVariant: "",
                maxImagesVariant: "",
              });
            }}
          >
            {isPending ? <Spinner /> : "Tambahkan Variant"}
          </Button>
        </div>
      </div>
    </div>
  );
}
