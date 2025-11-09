"use client";
import { useState } from "react";
import { useGetRegencies } from "../api/get-regencies";
import { DropdownSelector } from "./dropdown-selector";

type RegencieSelectorProps = {
  province: string;
  value?: string;
  onValueChange: (value: string) => void;
};

export const RegencieSelector = (props: RegencieSelectorProps) => {
  const { province, value, onValueChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const {
    data: regencies,
    isLoading: fetchRegenciesLoading,
    isError: fetchRegenciesError,
  } = useGetRegencies({
    province,
    queryConfig: {
      enabled: isOpen && !!province,
    },
  });
  return (
    <DropdownSelector
      placeholder="Kabupaten/Kota"
      data={regencies || []}
      isLoading={fetchRegenciesLoading}
      isError={fetchRegenciesError}
      value={value || ""}
      disabled={!province}
      fieldImportant="Provinsi"
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
    />
  );
};
