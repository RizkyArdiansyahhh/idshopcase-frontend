import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Material } from "@/types/api";

type MaterialSelectorProps = {
  options: Material[];
  value?: number[];
  onChange: (val: number[]) => void;
};

export const MaterialSelector = (props: MaterialSelectorProps) => {
  const { options = [], value = [], onChange } = props;
  const toggleSelect = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="flex flex-row gap-2 border h-32 rounded-md">
      <div className="flex w-4/5 flex-wrap gap-2 p-3 overflow-scroll">
        {value.length === 0 && (
          <div className="w-ful h-full justify-center">
            <span className="text-foreground/50 text-xs">
              Belum ada pilihan, silahkan pilih tipe handphone
            </span>
          </div>
        )}
        {value.map((id) => {
          const item = options.find((opt) => opt.id === id);
          if (!item) return null;

          return (
            <Badge
              key={id}
              variant="secondary"
              className="cursor-pointer h-10"
              onClick={() => toggleSelect(id)}
            >
              {item.name} ✕
            </Badge>
          );
        })}
      </div>
      <Separator orientation="vertical"></Separator>

      <div className="flex w-1/5 justify-center items-center p-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="w-fit ">
              + Tipe
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-56 h-56 overflow-scroll p-2" align="end">
            <div className="flex flex-col gap-1">
              {options.map((item) => {
                const selected = value.includes(item.id);

                return (
                  <div key={item.id}>
                    <div
                      onClick={() => toggleSelect(item.id)}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer text-sm"
                    >
                      <span>{item.name}</span>
                      {selected && <Check size={16} />}
                    </div>
                    <Separator></Separator>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
