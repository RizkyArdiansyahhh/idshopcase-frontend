import { Address } from "@/types/api";
import { useGetAddresses } from "../api/get-address";
import { AddressCard } from "@/app/(customer)/account/address/_components/address-card";
import { Skeleton } from "@/components/ui/skeleton";

export const AddressesList = () => {
  const { data: addresses, isLoading: fetchAddressesLoading } =
    useGetAddresses();

  const sortedAddresses = addresses
    ? [...addresses].sort(
        (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)
      )
    : [];

  return (
    <>
      {fetchAddressesLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-[20%] rounded-sm py-3 px-7 bg-accent/90"
            />
          ))
        : sortedAddresses.map((address) => (
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
          ))}
    </>
  );
};
