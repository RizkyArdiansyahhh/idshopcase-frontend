import { Control } from "react-hook-form";
import { PhoneTypeInput, VariantInput } from "./input-form-detail-product";
import { Separator } from "@/components/ui/separator";

type InputsFormProductProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  variants?: Array<{ id: string; name: string }>;
  phone_type?: Array<{ id: string; model: string }>;
  isValidate?: boolean;
};

export const InputsFormProduct = (props: InputsFormProductProps) => {
  const { control, variants = [], phone_type = [], isValidate = false } = props;

  return (
    <>
      {variants.length > 0 && (
        <>
          <VariantInput variants={variants} control={control} />

          {isValidate && (
            <Separator orientation="horizontal" className="my-2" />
          )}
        </>
      )}

      {phone_type.length > 0 && (
        <>
          <PhoneTypeInput phone_type={phone_type} control={control} />

          {isValidate && (
            <Separator orientation="horizontal" className="my-2" />
          )}
        </>
      )}
    </>
  );
};
