"use client";
import { useState } from "react";
import { DropdownSelector } from "./dropdown-selector";
import { useGetDistricts } from "../api/get-districts";

type DistrictSelectorProps = {
  codeRegency: string;
  value?: string;
  onValueChange: (value: string) => void;
};

export const DistrictSelector = (props: DistrictSelectorProps) => {
  const { codeRegency, value, onValueChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: districts,
    isLoading: fetchDistrictsLoading,
    isError: fetchDistrictsError,
  } = useGetDistricts({
    codeRegency,
    queryConfig: {
      enabled: isOpen && !!codeRegency,
    },
  });
  return (
    <DropdownSelector
      placeholder="Kecamatan"
      data={districts || []}
      isLoading={fetchDistrictsLoading}
      isError={fetchDistrictsError}
      value={value || ""}
      disabled={!codeRegency}
      fieldImportant="Kabupaten/Kota"
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
    />
  );
};
