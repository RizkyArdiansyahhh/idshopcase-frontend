import { AlertMessage } from "@/components/shared/alert-message";
import { CreateVariant } from "./create-variant";
import { VariantSelector } from "./material-selector";
import { UseFormReturn } from "react-hook-form";
import { useMemo, useState } from "react";
import { useGetVariants } from "../api/get-variants";
import { FormLabel } from "@/components/ui/form";

type FormVariantProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
};

export const FormVariant = (props: FormVariantProps) => {
  const { form } = props;

  const [activeVariantId, setActiveVariantId] = useState<number | null>(null);
  console.log(activeVariantId, "ini active variant");

  const { data: variants = [] } = useGetVariants();
  const variantValue = form.watch("variant");

  console.log(variantValue, "ini variant value");

  const variantMap = useMemo(() => {
    return new Map(variants.map((v) => [v.id, v]));
  }, [variants]);

  const selectedVariants = useMemo(() => {
    return (variantValue ?? [])
      .map((id: number) => variantMap.get(id))
      .filter(Boolean);
  }, [variantValue, variantMap]);

  const activeVariant = useMemo(() => {
    if (!activeVariantId) return null;
    return variantMap.get(activeVariantId) ?? null;
  }, [activeVariantId, variantMap]);

  return (
    <>
      <div className="border p-4 rounded-md flex flex-col gap-3">
        <FormLabel>Variant Produk</FormLabel>
        <VariantSelector
          value={selectedVariants}
          form={form}
          setActiveVariant={setActiveVariantId}
        ></VariantSelector>
        <AlertMessage
          message={`Jika Produk Tidak Memiliki Variant Harap Menambahkan minimal 1 Variant dengan label "-"`}
          variant="info"
        />
        <AlertMessage
          message={`Klik salah satu variant untuk melihat detail dan melakukan update.`}
          variant="info"
        />
        <CreateVariant
          form={form}
          activeVariant={activeVariant}
          setActiveVariant={setActiveVariantId}
        />
      </div>
    </>
  );
};
