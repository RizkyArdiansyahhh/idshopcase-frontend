import { Control } from "react-hook-form";
import {
  MaterialInput,
  PhoneTypeInput,
  VariantInput,
} from "./input-form-detail-product";
import { Separator } from "@/components/ui/separator";

type InputsFormProductProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  materials?: Array<{ id: string; name: string }>;
  variants?: Array<{ id: string; name: string }>;
  phone_type?: Array<{ id: string; model: string }>;
  isValidate?: boolean;
};

export const InputsFormProduct = (props: InputsFormProductProps) => {
  const {
    control,
    variants = [],
    materials = [],
    phone_type = [],
    isValidate = false,
  } = props;

  return (
    <>
      {/* MATERIAL */}
      {materials.length > 0 && (
        <>
          <MaterialInput materials={materials} control={control} />

          {isValidate && (
            <Separator orientation="horizontal" className="my-2" />
          )}
        </>
      )}

      {/* VARIANT */}
      {variants.length > 0 && (
        <>
          <VariantInput variants={variants} control={control} />

          {isValidate && (
            <Separator orientation="horizontal" className="my-2" />
          )}
        </>
      )}

      {/* PHONE TYPE */}
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
