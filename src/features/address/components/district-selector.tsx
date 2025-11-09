"use client";
import { useState } from "react";
import { DropdownSelector } from "./dropdown-selector";
import { useGetDistricts } from "../api/get-districts";

type DistrictSelectorProps = {
  regency: string;
  value?: string;
  onValueChange: (value: string) => void;
};

export const DistrictSelector = (props: DistrictSelectorProps) => {
  const { regency, value, onValueChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: districts,
    isLoading: fetchDistrictsLoading,
    isError: fetchDistrictsError,
  } = useGetDistricts({
    regency,
    queryConfig: {
      enabled: isOpen && !!regency,
    },
  });
  return (
    <DropdownSelector
      placeholder="Kecamatan"
      data={districts || []}
      isLoading={fetchDistrictsLoading}
      isError={fetchDistrictsError}
      value={value || ""}
      disabled={!regency}
      fieldImportant="Kabupaten/Kota"
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
    />
  );
};
