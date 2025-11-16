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
  variantOptions: string[];
  materialOptions: string[];
  phoneTypeOptions: string[];
  isValidate?: boolean;
};

export const InputsFormProduct = (props: InputsFormProductProps) => {
  const {
    control,
    variantOptions,
    materialOptions,
    phoneTypeOptions,
    isValidate = false,
  } = props;

  return (
    <>
      {/* MATERIAL */}
      {materialOptions.length > 0 && (
        <>
          <MaterialInput materials={materialOptions} control={control} />

          {isValidate && (
            <Separator orientation="horizontal" className="my-2"></Separator>
          )}
        </>
      )}

      {/* VARIANT */}
      {variantOptions.length > 0 && (
        <>
          <VariantInput variants={variantOptions} control={control} />

          {isValidate && (
            <Separator orientation="horizontal" className="my-2"></Separator>
          )}
        </>
      )}

      {/* PHONE TYPE */}
      {phoneTypeOptions.length > 0 && (
        <>
          <PhoneTypeInput phone_type={phoneTypeOptions} control={control} />

          {isValidate && (
            <Separator orientation="horizontal" className="my-2"></Separator>
          )}
        </>
      )}
    </>
  );
};
