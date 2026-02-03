/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCheckout } from "@/features/checkout/hooks/useCheckout";

import { AddressCard } from "./components/AddressCard";
import { OrderSummaryCard } from "./components/OrderSummaryCard";
import { PaymentSummary } from "../../../features/checkout/components/PaymentSummary";
import { CheckoutButton } from "./components/CheckoutButton";

export default function CheckoutPage() {
  const {
    selectedAddress,
    setSelectedAddress,
    isAddressModalOpen,
    setIsAddressModalOpen,
    detailProduct,
    previewImage,
    handleFileSelect,
    handleRemove,
    handleCreateOrder,
    createOrderIsLoading,
    summaryOrderRequest,
    isImageValid,
    isAllImageValid,
  } = useCheckout();

  return (
    <div className="w-full min-h-screen p-2.5 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Address */}
          <AddressCard
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            isAddressModalOpen={isAddressModalOpen}
            setIsAddressModalOpen={setIsAddressModalOpen}
          />

          {/* Order Summary with UploadCard */}
          <OrderSummaryCard
            isImageValid={isImageValid}
            detailProduct={detailProduct}
            previewImages={previewImage}
            onFilesSelect={handleFileSelect as any}
            onRemove={handleRemove}
          />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="sticky top-6">
            <PaymentSummary
              isAllImageValid={isAllImageValid}
              addressId={selectedAddress?.id || null}
              paymentMethod={"DOKU"}
              dataRequest={summaryOrderRequest}
              createOrderIsLoading={createOrderIsLoading}
              handleCreateOrder={handleCreateOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
