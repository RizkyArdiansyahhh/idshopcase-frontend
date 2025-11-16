import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { Combobox } from "./combo-box";
import { CardQuantity } from "@/components/shared/card-quantity";
import { material, PhoneType, variant } from "@/types/api";

type InputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  materials?: string[];
  variants?: string[];
  phone_type?: string[];
  stockProduct?: number;
};
export const VariantInput = (props: InputProps) => {
  const { control, variants } = props;
  return (
    <FormField
      name="variant"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Variant</FormLabel>
          <RadioGroup
            onValueChange={field.onChange}
            value={(field.value as string) || undefined}
            className={"flex flex-row"}
          >
            {variants?.map((item) => (
              <FieldLabel htmlFor={item} key={item}>
                <Field orientation="horizontal" className="w-fit">
                  <FieldTitle>{item}</FieldTitle>
                  <RadioGroupItem value={item} id={item} className="sr-only" />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  );
};
export const MaterialInput = (props: InputProps) => {
  const { control, materials } = props;
  return (
    <FormField
      name="material"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Material</FormLabel>
          <RadioGroup
            onValueChange={field.onChange}
            value={(field.value as string) || undefined}
            className={"flex flex-row"}
          >
            {materials?.map((item) => (
              <FieldLabel htmlFor={item} key={item}>
                <Field orientation="horizontal" className="w-fit">
                  <FieldTitle>{item}</FieldTitle>
                  <RadioGroupItem value={item} id={item} className="sr-only" />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  );
};
export const PhoneTypeInput = (props: InputProps) => {
  const { control, phone_type } = props;

  const data = phone_type?.map((item) => {
    const label = item.trim();
    const value = item.trim().toLowerCase().replace(/\s+/g, "-");
    return {
      value,
      label,
    };
  });

  return (
    <FormField
      name="phone_type"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Jenis Handphone</FormLabel>
          <Combobox
            field={field}
            data={data || []}
            className="border-foreground/10"
          ></Combobox>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  );
};

export const QuantityInput = (props: InputProps) => {
  const { control, stockProduct } = props;
  if (!stockProduct) return null;
  return (
    <FormField
      name="quantity"
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-row justify-between items-start">
          <div>
            <FormLabel>Kuantitas</FormLabel>
            <FormDescription>Tersedia {stockProduct}</FormDescription>
          </div>

          <CardQuantity field={field} stock={stockProduct}></CardQuantity>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  );
};
