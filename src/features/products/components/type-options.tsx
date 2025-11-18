import { useGetMaterials } from "../api/get-materials";
import { useGetPhoneTypes } from "../api/get-phone-types";
import { MaterialSelector } from "./material-selector";
import { PhoneTypeSelector } from "./phone-type-selector";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

type TypeOptionsProps = {
  value?: number[];
  onChange: (val: number[]) => void;
};
export const PhoneTypeOptions = (props: TypeOptionsProps) => {
  const { value = [], onChange } = props;
  const { data: phoneTypes = [] } = useGetPhoneTypes();

  return (
    <div className="space-y-2">
      <PhoneTypeSelector
        options={phoneTypes}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const MaterialOptions = (props: TypeOptionsProps) => {
  const { value = [], onChange } = props;
  const { data: materials = [] } = useGetMaterials();

  return (
    <div className="space-y-2">
      <MaterialSelector options={materials} value={value} onChange={onChange} />
    </div>
  );
};
