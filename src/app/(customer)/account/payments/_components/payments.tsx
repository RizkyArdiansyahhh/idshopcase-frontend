import { ChoiceCard } from "@/components/shared/choice-card";
import { FieldGroup } from "@/components/ui/field";
import { RadioGroup } from "@radix-ui/react-radio-group";

export const Payments = () => {
  return (
    <div className="w-full h-5/6  overflow-auto">
      <FieldGroup>
        <RadioGroup defaultValue="qris">
          <ChoiceCard id="qris"></ChoiceCard>
          <ChoiceCard id="dana"></ChoiceCard>
          <ChoiceCard id="gopay"></ChoiceCard>
          <ChoiceCard id="shopeepay"></ChoiceCard>
          <ChoiceCard id="cod"></ChoiceCard>
        </RadioGroup>
      </FieldGroup>
    </div>
  );
};
