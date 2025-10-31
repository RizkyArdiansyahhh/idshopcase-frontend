import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import VariantField from "./variant-field";
import { VariantOption } from "@/types/api";
import { generateCombinations } from "@/lib/generate-combinantions";
import { useState } from "react";

type VariantsFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  isVariant: boolean;
};

export const VariantsForm = (props: VariantsFormProps) => {
  const { form, isVariant } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [combinations, setCombinations] = useState<Array<any>>([]);
  const [isEditCombination, setIsEditCombination] = useState(false);

  const {
    fields: fieldsVariantOptions,
    append: appendVariantOption,
    remove: removeVariantOption,
  } = useFieldArray({
    control: form.control,
    name: "variantOptions",
  });

  const variantOptions = form.watch("variantOptions");

  const isNextEnabled =
    variantOptions.length > 0 &&
    variantOptions.every((variant: VariantOption) => {
      const hasValidValues =
        variant.valueVariants &&
        variant.valueVariants.length > 0 &&
        variant.valueVariants.every((v) => v.label.trim() !== "");
      return hasValidValues && variant.nameVariant.trim() !== "";
    });

  const handleGenerateCombinations = () => {
    setIsEditCombination(true);
    const options = form.getValues("variantOptions");
    const combos = generateCombinations(
      options.map((v: VariantOption) => ({
        nameVariant: v.nameVariant,
        valueVariant: v.valueVariants?.map((val) => val.label) || [],
      }))
    );

    const result = combos.map((c) => ({
      combination: c,
      price: 0,
      stock: 0,
    }));

    setCombinations(result);
    form.setValue("variantCombinations", result);
  };

  return (
    <>
      {isVariant &&
        fieldsVariantOptions.map((variant, index) => {
          return (
            <VariantField
              key={variant.id}
              control={form.control}
              index={index}
              removeVariant={removeVariantOption}
              isDisabled={isEditCombination}
            />
          );
        })}
      <div
        className={`flex  justify-center py-2 ${
          (!fieldsVariantOptions.length || !isVariant) && "h-full items-center"
        }`}
      >
        <Button
          type="button"
          variant={"secondary"}
          className="cursor-pointer"
          disabled={!isVariant}
          onClick={() =>
            appendVariantOption({
              nameVariant: "",
              valueVariant: [
                {
                  label: "",
                },
              ],
            })
          }
        >
          Tambah Variasi
          <PlusCircle />
        </Button>
      </div>
      {combinations.length > 0 && isEditCombination && (
        <div className="mt-4 space-y-2 border-t pt-3">
          <h3 className="font-semibold">Atur Harga dan Stok</h3>

          {combinations.map(
            (
              combo: {
                combination: Record<string, string>;
                stock: number;
                price: number;
              },
              i: number
            ) => (
              <div key={i} className="flex gap-2 flex-col">
                <div className="flex-1 text-sm">
                  <p className="text-app-light-sm">{`${Object.values(
                    combo.combination
                  ).join(" / ")}`}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name={`variantCombinations.${i}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          type="string"
                          placeholder="Harga"
                          {...field}
                          value={field.value || ""}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variantCombinations.${i}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          type="string"
                          placeholder="Stok"
                          {...field}
                          value={field.value || ""}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {i < combinations.length - 1 && <Separator></Separator>}
              </div>
            )
          )}
        </div>
      )}

      <div className={`w-full absolute bottom-0 right-0 p-2 `}>
        <Separator className="my-2"></Separator>
        <Button
          type="button"
          variant={isEditCombination ? "destructive" : "default"}
          className="w-full"
          onClick={
            isEditCombination
              ? () => setIsEditCombination(false)
              : handleGenerateCombinations
          }
          disabled={!isNextEnabled}
        >
          {isEditCombination ? "Batalkan" : "Selanjutnya Atur Stok dan Harga"}
        </Button>
      </div>
    </>
  );
};
