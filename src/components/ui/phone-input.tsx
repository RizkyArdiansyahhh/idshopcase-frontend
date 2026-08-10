"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
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

export type Country = {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Singapura", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
  { name: "Filipina", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Myanmar", code: "MM", dialCode: "+95", flag: "🇲🇲" },
  { name: "Kamboja", code: "KH", dialCode: "+855", flag: "🇰🇭" },
  { name: "Brunei", code: "BN", dialCode: "+673", flag: "🇧🇳" },
  { name: "Laos", code: "LA", dialCode: "+856", flag: "🇱🇦" },
  { name: "Timor Leste", code: "TL", dialCode: "+670", flag: "🇹🇱" },
  { name: "Amerika Serikat", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "Inggris (UK)", code: "GB", dialCode: "+44", flag: "🇬🇧" },
];

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function PhoneInput({
  value = "",
  onChange,
  disabled = false,
  placeholder = "81234567890",
  id,
  className,
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);

  // Determine current country dial code & phone number from value
  const matchedCountry = React.useMemo(() => {
    if (!value) return COUNTRIES[0]; // Default ID (+62)
    const found = COUNTRIES.find((c) => value.startsWith(c.dialCode));
    return found || COUNTRIES[0];
  }, [value]);

  const [selectedCountry, setSelectedCountry] =
    React.useState<Country>(matchedCountry);

  React.useEffect(() => {
    if (matchedCountry) {
      setSelectedCountry(matchedCountry);
    }
  }, [matchedCountry]);

  // Extract digits without dial code
  const numberWithoutCode = React.useMemo(() => {
    if (!value) return "";
    if (value.startsWith(selectedCountry.dialCode)) {
      return value.slice(selectedCountry.dialCode.length);
    }
    return value.replace(/^\+?\d{1,4}/, "");
  }, [value, selectedCountry]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);
    const cleanNumber = numberWithoutCode.replace(/^0+/, "");
    const newValue = cleanNumber
      ? `${country.dialCode}${cleanNumber}`
      : country.dialCode;
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    // Strip leading 0 if user types 0812...
    if (inputVal.startsWith("0")) {
      inputVal = inputVal.replace(/^0+/, "");
    }
    // Only keep numeric digits
    inputVal = inputVal.replace(/\D/g, "");

    const fullValue = inputVal ? `${selectedCountry.dialCode}${inputVal}` : "";
    onChange?.(fullValue);
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-md border border-input bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:outline-hidden",
        className
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="flex items-center gap-1.5 px-3 rounded-r-none border-r hover:bg-muted/50 h-10 shrink-0"
          >
            <span className="text-lg leading-none">{selectedCountry.flag}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search for countries..." />
            <CommandList>
              <CommandEmpty>Negara tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.dialCode}`}
                    onSelect={() => handleCountrySelect(country)}
                    className="flex items-center justify-between cursor-pointer py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{country.flag}</span>
                      <span className="font-medium text-sm">
                        {country.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        ({country.dialCode})
                      </span>
                    </div>
                    {selectedCountry.code === country.code && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex items-center flex-1 px-3 py-2 text-sm">
        <span className="text-muted-foreground font-medium select-none mr-1.5">
          {selectedCountry.dialCode}
        </span>
        <input
          id={id}
          type="tel"
          disabled={disabled}
          placeholder={placeholder}
          maxLength={13}
          value={numberWithoutCode}
          onChange={handleInputChange}
          className="w-full bg-transparent outline-hidden placeholder:text-muted-foreground text-foreground"
        />
      </div>
    </div>
  );
}
