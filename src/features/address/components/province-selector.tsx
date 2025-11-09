"use client";
import { useState } from "react";
import { useGetProvinces } from "../api/get-province";
import { DropdownSelector } from "./dropdown-selector";

type ProvinceSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export const ProvinceSelector = (props: ProvinceSelectorProps) => {
  const { value, onValueChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: provinces,
    isLoading: fetchProvincesLoading,
    isError: fetchProvincesError,
  } = useGetProvinces({
    queryConfig: {
      enabled: isOpen,
    },
  });

  return (
    <DropdownSelector
      placeholder="Provinsi"
      data={provinces || []}
      isLoading={fetchProvincesLoading}
      isError={fetchProvincesError}
      value={value}
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
    />
  );
};
