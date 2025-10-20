import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

type DropdownSelectorProps<T> = {
  placeholder: string;
  data: T[];
  isLoading: boolean;
  isError: boolean;
  value: string;
  disabled?: boolean;
  fieldImportant?: string;
  onValueChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
};

export const DropdownSelector = <T extends { id: string; name: string }>({
  placeholder,
  data,
  isLoading,
  isError,
  value,
  disabled,
  fieldImportant,
  onValueChange,
  onOpenChange,
}: DropdownSelectorProps<T>) => {
  return (
    <Field>
      <Select
        onOpenChange={(open) => onOpenChange(open)}
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          <SelectGroup>
            <SelectLabel>{placeholder}</SelectLabel>
            {disabled ? (
              <SelectItem value="disabled" disabled>
                Silahkan pilih {fieldImportant} terlebih dahulu
              </SelectItem>
            ) : isLoading ? (
              <div className="py-2 w-full h-1/3 flex items-center justify-center gap-2">
                <Spinner className="size-5 text-foreground/30" />
                <p className="text-sm text-foreground/30">Memuat...</p>
              </div>
            ) : isError ? (
              <div className="py-2 w-full h-1/3 flex items-center justify-center gap-2">
                <p className="text-sm text-foreground/30">Terjadi kesalahan</p>
              </div>
            ) : (
              data?.map((item) => {
                return (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                );
              })
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};
