/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";

const CheckoutPage = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Mock product
  const product = {
    id: "prod_123",
    name: "Case iPhone 16 Pro Max Custom",
    price: 150000,
    imageUrl: "/images/products/custom-case/custom-case-2.webp",
    material: "Diamond Impact",
    phoneType: "iPhone",
  };

  // Mock alamat user
  const userAddresses = [
    {
      id: 1,
      label: "Rumah",
      street: "Jl. Harapan Raya, Bukit Raya",
      city: "Kota Pekanbaru",
      province: "Riau",
      zip: "16623",
    },
    {
      id: 2,
      label: "Kantor",
      street: "Jalan Thamrin 10",
      city: "Jakarta",
      province: "DKI Jakarta",
      zip: "10230",
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState(userAddresses[0]);
  const shippingCost = 240;

  // Payment method (fixed: DOKU)
  const paymentMethod = "DOKU";

  const subtotal = product.price * quantity;
  const totalPayment = subtotal + shippingCost;

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));

  // --- Jokul DOKU modal ---
  useEffect(() => {
    // Load CSS Jokul
    const cssJokul = document.createElement("link");
    cssJokul.rel = "stylesheet";
    cssJokul.href =
      "https://jokul.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.css";
    document.head.appendChild(cssJokul);
  }, []);

  function loadJokulCheckout(url: string) {
    const token = url + "?view=iframe";
    const existingModal = document.getElementById("jokul_checkout_modal");

    if (existingModal) {
      existingModal.style.display = "block";
      const iframeElement = existingModal.querySelector("iframe");
      if (iframeElement) {
        iframeElement.src = token;
      }
      return;
    }

    const jokulCheckoutModal = document.createElement("div");
    jokulCheckoutModal.className = "jokul-modal";
    jokulCheckoutModal.id = "jokul_checkout_modal";
    jokulCheckoutModal.innerHTML = `
      <div class="jokul-content">
        <iframe src="${token}"></iframe>
      </div>
    `;
    document.body.appendChild(jokulCheckoutModal);
  }

  const handleCreateOrder = async () => {
    setIsLoading(true);

    // Mock orderData (untuk backend nanti)
    const orderData = {
      addressId: 1,
      selecetedItemIds: [5],
    };

    // Panggil Jokul modal
    loadJokulCheckout(
      "https://jokul.doku.com/checkout/link/SU5WFDferd561dfasfasdfae123c20200510090550775"
    );

    // Simulasikan request ke backend (opsional)
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://monistically-exopathic-maida.ngrok-free.dev/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <- perbaikan di sini
          },
          body: JSON.stringify({
            addressId: orderData.addressId,
            selectedItemIds: orderData.selecetedItemIds,
          }),
        }
      );
      const resData = await res.json();

      if (!res.ok) {
        console.error("Order failed:", resData);
        return;
      }

      console.log("Order success:", resData);

      // Ambil payment URL dari response
      const paymentUrl = resData.checkout.response.payment.url;
      console.log("Payment URL:", paymentUrl);

      if (paymentUrl) {
        loadJokulCheckout(paymentUrl); // <-- buka DOKU Checkout modal
      }

      if (!res.ok) {
        const errData = await res.json();
        console.error("Order failed:", errData);
      } else {
        const data = await res.json();
        console.log("Order success:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 p-6 bg-gray-50">
      {/* Alamat Pengiriman */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Alamat Pengiriman</CardTitle>
            <DialogTrigger asChild>
              <Button variant="link">Ubah</Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{selectedAddress.label}</p>
            <p className="text-sm text-gray-500">{`${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.province}, ${selectedAddress.zip}`}</p>
          </CardContent>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pilih Alamat Pengiriman</DialogTitle>
              <DialogDescription>
                Pilih alamat yang ingin digunakan untuk pengiriman
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              {userAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex justify-between items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedAddress(addr);
                    setIsAddressModalOpen(false);
                  }}
                >
                  <div>
                    <p className="font-medium">{addr.label}</p>
                    <p className="text-sm text-gray-500">{`${addr.street}, ${addr.city}, ${addr.province}, ${addr.zip}`}</p>
                  </div>
                  {selectedAddress.id === addr.id && (
                    <span className="font-bold text-green-600">✓</span>
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddressModalOpen(false)}
              >
                Batal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Card>
      </Dialog>

      {/* Ringkasan Pesanan */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-4 items-center">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-500">{product.phoneType}</p>
              <p className="text-sm text-gray-500">{product.material}</p>
            </div>
            <p className="font-bold text-lg">{formatCurrency(product.price)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDecrease}>
              -
            </Button>
            <span className="px-4">{quantity}</span>
            <Button variant="outline" onClick={handleIncrease}>
              +
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment & Total */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Metode Pembayaran</CardTitle>
          <p>{paymentMethod}</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pengiriman:</span>
              <span>{formatCurrency(shippingCost)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Pembayaran:</span>
              <span>{formatCurrency(totalPayment)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleCreateOrder}
            className="w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Buat Pesanan"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutPage;
