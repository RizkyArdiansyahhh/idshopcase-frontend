import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import clsx from "clsx";

type SizeKey = "5" | "10";

type CardQuantityProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  stock: number;
  size?: SizeKey;
};

const buttonSizeMap: Record<SizeKey, string> = {
  "5": "h-5 w-5 background-transparent border-transparent",
  "10": "h-10 w-10",
};

const inputSizeMap: Record<SizeKey, string> = {
  "5": "h-5 w-10 text-xs",
  "10": "h-10 w-20 text-sm",
};

export const CardQuantity = ({
  field,
  stock,
  size = "10",
}: CardQuantityProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={buttonSizeMap[size]}
        disabled={field.value <= 1}
        onClick={() => field.onChange(field.value - 1)}
      >
        <Minus className="h-3 w-3" />
      </Button>

      <Input
        type="text"
        value={field.value}
        className={clsx(inputSizeMap[size], "text-center")}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!Number.isNaN(val) && val >= 1 && val <= stock) {
            field.onChange(val);
          }
        }}
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        className={buttonSizeMap[size]}
        disabled={field.value >= stock}
        onClick={() => field.onChange(field.value + 1)}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};
