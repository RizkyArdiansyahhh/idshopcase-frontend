import Image from "next/image";
import { Field, FieldLabel } from "../ui/field";
import { RadioGroupItem } from "../ui/radio-group";

type ChoiceCardProps = {
  id: string;
};

export const ChoiceCard = (props: ChoiceCardProps) => {
  const { id } = props;
  return (
    <>
      <FieldLabel
        htmlFor={id}
        className=" bg-gradient-to-r from-transparent  to-foreground/10 mb-3"
      >
        <Field orientation="horizontal">
          <Image
            src="https://cdn.prod.website-files.com/674ab654de930b217c6389c1/6768ffe4b3a0965dc1ecc385_QRIS-logo.png"
            width={80}
            height={80}
            alt="payment-icon"
          ></Image>
          <RadioGroupItem value={id} id={id}></RadioGroupItem>
        </Field>
      </FieldLabel>
    </>
  );
};
