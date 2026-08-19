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
          <div className="flex flex-row justify-between items-center mb-2">
            <FormLabel className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
              Varian
            </FormLabel>
            <FormMessage />
          </div>

          <RadioGroup
            onValueChange={field.onChange}
            value={field.value || undefined}
            className="flex flex-wrap gap-2.5 w-full max-w-full"
          >
            {variants?.map((item) => {
              const isSelected = field.value === item.id;
              return (
                <label
                  key={item.id}
                  htmlFor={`variant-${item.id}`}
                  className={`inline-flex items-center justify-center cursor-pointer border rounded-none px-3.5 py-2 text-xs md:text-sm font-medium transition-all duration-150 select-none ${
                    isSelected
                      ? "border-foreground bg-foreground text-background font-semibold shadow-xs"
                      : "border-input bg-background hover:bg-muted/70 text-foreground"
                  }`}
                >
                  <RadioGroupItem
                    value={item.id}
                    id={`variant-${item.id}`}
                    className="sr-only"
                  />
                  <span>{item.name}</span>
                </label>
              );
            })}
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
          <div className="flex flex-row justify-between items-center mb-1">
            <FormLabel className="text-sm font-semibold">Tipe HP</FormLabel>
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
            <FormLabel className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
              Kuantitas
            </FormLabel>
            <FormDescription className="text-xs text-neutral-400">
              Tersedia {stockProduct}
            </FormDescription>
          </div>

          <CardQuantity field={field} stock={stockProduct}></CardQuantity>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  );
};
