"use client";

import { useCheckout } from "@/features/checkout/hooks/useCheckout"; // path sesuai implementasimu

import { AddressCard } from "./components/AddressCard";
import { OrderSummaryCard } from "./components/OrderSummaryCard";
import { UploadCard } from "./components/UploadCard";
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
    setPreviewImage,
    shippingCost,
    totalPayment,
    paymentMethod,
    handleCreateOrder,
    createOrderIsLoading,
    handleImageChange,
    previewImage,
  } = useCheckout();
  const dataCheckout = useCheckoutStore((state) => state.data);
  const dataSelected = useCheckoutStore((state) => state.selectedCartIds);
  console.log(dataCheckout);
  console.log(dataSelected);
  const { replace } = useRouter();

  // if (!dataCheckout || !dataSelected) {
  //   return (
  //     <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 text-center">
  //       <div className="max-w-sm flex flex-col items-center gap-4">
  //         <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
  //           <span className="text-4xl">😕</span>
  //         </div>

  //         <h2 className="text-xl font-semibold">Order Tidak Ditemukan</h2>

  //         <p className="text-muted-foreground text-sm">
  //           Kami tidak menemukan order dengan ID tersebut. Pastikan Anda membuka
  //           halaman dari riwayat order atau mencoba kembali.
  //         </p>

  //         <Button
  //           onClick={() => {
  //             replace("/");
  //           }}
  //           className="mt-3 w-full"
  //         >
  //           Kembali untuk belanja
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <AddressCard
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            isAddressModalOpen={isAddressModalOpen}
            setIsAddressModalOpen={setIsAddressModalOpen}
          />

          <OrderSummaryCard
            detailProduct={detailProduct!}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
            setPreviewImage={setPreviewImage}
          />
        </div>

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
