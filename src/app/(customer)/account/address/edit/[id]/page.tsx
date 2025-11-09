"use client";
import { Address } from "@/features/address/components/address";
import { useParams } from "next/navigation";

const EditAddressPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Address addressId={Number(id)}></Address>
    </>
  );
};

export default EditAddressPage;
