"use client";
import { Address } from "@/features/address/components/address";
import { useParams } from "next/navigation";

const EditAddressPage = () => {
  const { id } = useParams();
  return (
    <>
      <Address addressId={Number(id)}></Address>
    </>
  );
};

export default EditAddressPage;
