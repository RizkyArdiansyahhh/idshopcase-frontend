"use client";
import { useState } from "react";
import { DropdownSelector } from "./dropdown-selector";
import { useGetVillages } from "../api/get-villages";

type VillageSelectorProps = {
  codeDistrict: string;
  value?: string;
  onValueChange: (value: string) => void;
};

export const VillageSelector = (props: VillageSelectorProps) => {
  const { codeDistrict, value, onValueChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: villages,
    isLoading: fetchVillagesLoading,
    isError: fetchVillagesError,
  } = useGetVillages({
    codeDistrict,
    queryConfig: {
      enabled: isOpen && !!codeDistrict,
    },
  });
  return (
    <DropdownSelector
      placeholder="Kelurahan/Desa"
      data={villages || []}
      isLoading={fetchVillagesLoading}
      isError={fetchVillagesError}
      value={value || ""}
      disabled={!codeDistrict}
      fieldImportant="Kecamatan"
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
    />
  );
};
