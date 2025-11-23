/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCheckout } from "@/features/checkout/hooks/useCheckout";

import { AddressCard } from "./components/AddressCard";
import { OrderSummaryCard } from "./components/OrderSummaryCard";
import { PaymentSummary } from "./components/PaymentSummary";
import { CheckoutButton } from "./components/CheckoutButton";
import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    shippingCost,
    totalPayment,
    paymentMethod,
    handleCreateOrder,
    createOrderIsLoading,
  } = useCheckout();

  const dataCheckout = useCheckoutStore((state) => state.data);
  const dataSelected = useCheckoutStore((state) => state.selectedCartIds);

  const { replace } = useRouter();

  return (
    <div className="w-full min-h-screen p-6">
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
              paymentMethod={paymentMethod}
              subtotal={detailProduct.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
              shippingCost={shippingCost}
            />

            <div className="mt-4">
              <CheckoutButton
                isLoading={createOrderIsLoading}
                onCreateOrder={handleCreateOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
