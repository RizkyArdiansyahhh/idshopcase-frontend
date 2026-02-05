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

type InputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  materials?: Array<{ id: string; name: string }>;
  variants?: Array<{ id: string; name: string }>;
  phone_type?: Array<{ id: string; model: string }>;
  stockProduct?: number;
};

export const VariantInput = ({ control, variants }: InputProps) => {
  return (
    <FormField
      name="variant"
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row justify-between">
            <FormLabel>Varian</FormLabel>
            <FormMessage />
          </div>

          <RadioGroup
            onValueChange={field.onChange}
            value={field.value || undefined}
            className="flex flex-nowrap flex-row gap-2 overflow-x-auto"
          >
            {variants?.map((item) => (
              <FieldLabel
                htmlFor={`variant-${item.id}`}
                key={item.id}
                className="inline-flex w-auto"
              >
                <Field
                  orientation="horizontal"
                  className="inline-flex w-auto shrink-0 px-3 py-2"
                >
                  <FieldTitle className="text-xs md:text-sm whitespace-nowrap">
                    {item.name}
                  </FieldTitle>
                  <RadioGroupItem
                    value={item.id}
                    id={`variant-${item.id}`}
                    className="sr-only"
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FormItem>
      )}
    />
  );
};

export const PhoneTypeInput = ({ control, phone_type }: InputProps) => {
  const data =
    phone_type?.map((p) => ({
      value: p.id,
      label: p.model,
    })) ?? [];

  return (
    <FormField
      name="phone_type"
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row justify-between">
            <FormLabel>Varian</FormLabel>
            <FormMessage />
          </div>

          <Combobox
            field={field}
            data={data}
            className="border-foreground/10"
          />
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
