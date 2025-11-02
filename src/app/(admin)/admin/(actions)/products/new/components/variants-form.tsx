import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import VariantField from "./variant-field";
import { generateCombinations } from "@/lib/generate-combinantions";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format-currency";

type VariantsFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  isVariant: boolean;
  isAddedCombination: boolean;
  isEditCombination: boolean;
  setIsEditCombination: (arg0: boolean) => void;
  setIsAddedCombination: (arg0: boolean) => void;
};

export const VariantsForm = (props: VariantsFormProps) => {
  const {
    form,
    isVariant,
    isAddedCombination,
    isEditCombination,
    setIsEditCombination,
    setIsAddedCombination,
  } = props;

  const combinations = form.watch("variantCombinations") || [];
  console.log("combinations", combinations);

  const {
    fields: fieldsVariantOptions,
    append: appendVariantOption,
    remove: removeVariantOption,
  } = useFieldArray({
    control: form.control,
    name: "variantOptions",
  });

  const variantOptions = form.watch("variantOptions");
  const inputImageVariantRef = useRef<(HTMLInputElement | null)[][]>([]);

  const isNextEnabled =
    variantOptions.length > 0 &&
    variantOptions.every(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (variant: { valueVariant: any[]; nameVariant: string }) => {
        const hasValidValues =
          variant.valueVariant &&
          variant.valueVariant.length > 0 &&
          variant.valueVariant.every((v) => v.label.trim() !== "");
        return hasValidValues && variant.nameVariant.trim() !== "";
      }
    );

  useEffect(() => {
    if (isAddedCombination && !isEditCombination) {
      handleGenerateCombinations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddedCombination, isEditCombination]);

  const handleGenerateCombinations = () => {
    const options = form.getValues("variantOptions");
    const existingCombinations = form.getValues("variantCombinations") || [];
    const combos = generateCombinations(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.map((v: { nameVariant: any; valueVariant: any[] }) => ({
        nameVariant: v.nameVariant,
        valueVariant: v.valueVariant?.map((val) => val.label) || [],
      }))
    );

    const result = combos.map((c) => {
      const found = existingCombinations.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (old: { combination: any }) =>
          JSON.stringify(old.combination) === JSON.stringify(c)
      );

      return {
        combination: c,
        price: found?.price,
        stock: found?.stock,
      };
    });

    form.setValue("variantCombinations", result);
    console.log("Watch after setValue:", form.watch("variantCombinations"));
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
              isDisabled={isEditCombination || isAddedCombination}
              inputRefs={inputImageVariantRef}
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
      {(combinations?.length ?? 0) > 0 &&
        (isEditCombination || isAddedCombination) && (
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
                            type="text"
                            placeholder="Harga"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                Number(e.target.value.replace(/\D/g, ""))
                              )
                            }
                            value={formatNumber(field.value)}
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
                            type="text"
                            placeholder="Stok"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                Number(e.target.value.replace(/\D/g, ""))
                              )
                            }
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
          variant={
            isEditCombination || isAddedCombination ? "destructive" : "default"
          }
          className="w-full"
          onClick={
            isEditCombination || isAddedCombination
              ? () => {
                  setIsEditCombination(false);
                  setIsAddedCombination(false);
                }
              : () => {
                  setIsEditCombination(true);
                  setIsAddedCombination(false);
                  handleGenerateCombinations();
                }
          }
          disabled={!isNextEnabled}
        >
          {isEditCombination || isAddedCombination
            ? "Batalkan untuk Edit Variasi"
            : "Selanjutnya Atur Stok dan Harga"}
        </Button>
      </div>
    </>
  );
};
