import { useFieldArray, Control } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash } from "lucide-react";
import { MdRemove } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { TooltipActions } from "./tooltip-actions";

interface VariantFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  index: number;
  removeVariant: (index: number) => void;
  isDisabled?: boolean;
}

const VariantField = ({
  control,
  index,
  removeVariant,
  isDisabled,
}: VariantFieldProps) => {
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: `variantOptions.${index}.valueVariant`,
  });

  return (
    <div className="flex flex-row gap-1">
      <TooltipActions
        icon={<Trash />}
        variant={"destructive"}
        isDisabled={isDisabled}
        action={() => removeVariant(index)}
      >
        <p>Hapus variasi</p>
      </TooltipActions>
      <div className="border rounded-md flex-1">
        <div className="flex flex-row gap-2 justify-between items-center pr-2">
          <FormField
            name={`variantOptions.${index}.nameVariant`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <Input
                  className="border-none focus-visible:ring-0 shadow-none"
                  {...field}
                  placeholder="Masukkan Nama Variasi"
                  disabled={isDisabled}
                ></Input>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant={"default"}
            size={"icon-sm"}
            className="rounded-full"
            disabled={isDisabled}
            onClick={() =>
              appendValue({
                label: "",
              })
            }
          >
            <PlusIcon />
          </Button>
        </div>

        <Separator></Separator>
        <div className="p-2">
          {valueFields?.map((_, i) => (
            <div key={i} className="w-full my-2">
              <div className="w-2/3 flex flex-row items-center gap-2">
                <TooltipActions
                  icon={<MdRemove />}
                  variant={"destructive"}
                  action={() => removeValue(i)}
                  isDisabled={isDisabled}
                >
                  <p>Hapus Label</p>
                </TooltipActions>
                <FormField
                  name={`variantOptions.${index}.valueVariant.${i}.label`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        type="text"
                        disabled={isDisabled}
                        placeholder={`Label ${i + 1}`}
                        {...field}
                      ></Input>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariantField;
