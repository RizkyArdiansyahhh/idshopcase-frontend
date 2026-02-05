import { useGetPhoneTypes } from "../api/get-phone-types";
import { PhoneTypeSelector } from "./phone-type-selector";

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
