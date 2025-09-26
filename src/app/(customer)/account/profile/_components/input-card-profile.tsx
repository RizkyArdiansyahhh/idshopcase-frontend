import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputCardProfile = {
  label: string;
  value: string;
  type: string;
  id: string;
};

export const InputCardProfile = (props: InputCardProfile) => {
  const { label, value, type, id } = props;
  return (
    <div className="flex flex-col gap-2 my-4">
      <Label>{label}</Label>
      <Input
        className="border-foreground"
        disabled
        type={type}
        id={id}
        value={value}
      ></Input>
    </div>
  );
};
