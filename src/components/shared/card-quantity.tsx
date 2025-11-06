import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CardQuantityProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  stock: number;
};

export const CardQuantity = (props: CardQuantityProps) => {
  const { field, stock } = props;
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          type="button"
          disabled={field.value === 1}
          onClick={() => field.onChange(field.value - 1)}
        >
          <Minus />
        </Button>

        <Input
          type="text"
          {...field}
          value={field.value}
          className="w-20 text-center h-10"
        />

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          type="button"
          disabled={stock === field.value}
          onClick={() => field.onChange(field.value + 1)}
        >
          <Plus />
        </Button>
      </div>
    </>
  );
};
