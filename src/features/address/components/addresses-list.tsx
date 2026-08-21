"use client";

import { useGetAddresses } from "../api/get-address";
import { AddressCard } from "@/app/(customer)/account/address/_components/address-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export const AddressesList = () => {
  const t = useTranslations("account.address");
  const { data: addresses, isLoading: fetchAddressesLoading } =
    useGetAddresses();

  const sortedAddresses = addresses
    ? [...addresses].sort(
        (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0),
      )
    : [];

  return (
    <>
      {fetchAddressesLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-24 rounded-none py-3 px-7 bg-neutral-100"
          />
        ))
      ) : addresses && addresses.length > 0 ? (
        sortedAddresses.map((address) => (
          <AddressCard
            key={address.id}
            id={address.id.toString()}
            fullname={address.recipient_name}
            phone={address.phone}
            detail={address.details || ""}
            district={address.district}
            city={address.city}
            province={address.province}
            postalCode={address.postal_code}
            isDefault={address.is_primary}
          />
        ))
      ) : (
        <div className="w-full py-12 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-neutral-400 font-normal">
            {t("empty")}
          </p>
        </div>
      )}
    </>
  );
};
