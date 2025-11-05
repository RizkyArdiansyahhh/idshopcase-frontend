"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Control } from "react-hook-form";

type ComboboxProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  data: Array<{ value: string; label: string }>;
  className?: string;
};
export function Combobox(props: ComboboxProps) {
  const { field, data, className } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between text-foreground rounded-sm border-foreground mb-4",
            className
          )}
        >
          {field.value
            ? data.find((d) => d.value === field.value)?.label
            : "Select Handphone..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search handphone..." className="h-9" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  key={d.value}
                  value={d.value}
                  onSelect={() => {
                    field.onChange(d.value);
                    setOpen(false);
                  }}
                >
                  {d.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      field.value === d.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
