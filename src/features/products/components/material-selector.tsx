import { Badge } from "@/components/ui/badge";
import { useGetVariants } from "../api/get-variants";
import { UseFormReturn } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Variant } from "@/types/api";

type VariantSelectorProps = {
  value?: Variant[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  setActiveVariant: (id: number) => void;
};

export const VariantSelector = (props: VariantSelectorProps) => {
  const { value = [], form, setActiveVariant } = props;

  const handleDelete = (id: number) => {
    const currentVariants = form.getValues("variant") || [];
    form.setValue(
      "variant",
      currentVariants.filter((v: number) => v !== id),
    );
  };

  return (
    <div className="flex flex-row gap-2 border h-32 rounded-md">
      <div className="flex w-full flex-wrap gap-2 p-3 overflow-scroll">
        {value.length === 0 && (
          <div className="w-ful h-full justify-center">
            <span className="text-foreground/50 text-xs">
              Belum ada pilihan, anda dapat menambahkan variant baru
            </span>
          </div>
        )}
        {value.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-row justify-center items-center gap-1"
            >
              <Badge
                variant="secondary"
                className="cursor-pointer h-10"
                onClick={() => setActiveVariant(item.id)}
              >
                {item.name}
              </Badge>
              <div
                className="bg-foreground border rounded-full w-6 h-6 flex justify-center items-center hover:cursor-pointer"
                onClick={() => handleDelete(item.id)}
              >
                <IoClose color="white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
