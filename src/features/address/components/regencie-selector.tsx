"use client";
import { useState } from "react";
import { useGetRegencies } from "../api/get-regencies";
import { DropdownSelector } from "./dropdown-selector";

type RegencieSelectorProps = {
  codeProvince: string;
  value?: string;
  onValueChange: ({ id, name }: { id: string; name: string }) => void;
};

export const RegencieSelector = (props: RegencieSelectorProps) => {
  const { codeProvince, value, onValueChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const {
    data: regencies,
    isLoading: fetchRegenciesLoading,
    isError: fetchRegenciesError,
  } = useGetRegencies({
    codeProvince,
    queryConfig: {
      enabled: isOpen && !!codeProvince,
    },
  });
  return (
    <DropdownSelector
      placeholder="Kabupaten/Kota"
      data={regencies || []}
      isLoading={fetchRegenciesLoading}
      isError={fetchRegenciesError}
      value={value || ""}
      disabled={!codeProvince}
      fieldImportant="Provinsi"
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
    />
  );
};
