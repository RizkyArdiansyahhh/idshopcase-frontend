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

type DropdownSelectorProps = {
  placeholder: string;
  data: string[];
  isLoading: boolean;
  isError: boolean;
  value: string;
  disabled?: boolean;
  fieldImportant?: string;
  onValueChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
};

export const DropdownSelector = ({
  placeholder,
  data,
  isLoading,
  isError,
  value,
  disabled,
  fieldImportant,
  onValueChange,
  onOpenChange,
}: DropdownSelectorProps) => {
  return (
    <Field>
      <Select
        value={value}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
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
              data?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};
