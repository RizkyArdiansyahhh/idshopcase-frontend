import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Control } from "react-hook-form";

type FieldCheckboxProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
};
export const FieldCheckbox = (props: FieldCheckboxProps) => {
  const { name, control, label } = props;
  return (
    <>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-row justify-between">
            <FormLabel>Apakah produk memiliki {label} ?</FormLabel>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            ></Checkbox>
          </FormItem>
        )}
      />
      <Separator className="mb-3 mt-1.5"></Separator>
    </>
  );
};
