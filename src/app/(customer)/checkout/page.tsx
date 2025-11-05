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
      street: "Jalan Sudirman 14",
      city: "Bogor",
      province: "Jawa Barat",
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
  const shippingCost = 10000;
  const paymentMethod = "DOKU";

  const subtotal = product.price * quantity;
  const totalPayment = subtotal + shippingCost;

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));

  // Load CSS Jokul
  useEffect(() => {
    const cssJokul = document.createElement("link");
    cssJokul.rel = "stylesheet";
    cssJokul.href =
      "https://jokul.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.css";
    document.head.appendChild(cssJokul);
  }, []);

  // Event listener untuk komunikasi iframe DOKU
  useEffect(() => {
    function receive(event: { data: any }) {
      const data = event.data;
      if (typeof (window as any)[data.func] === "function") {
        (window as any)[data.func](data);
      }
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  // Fungsi membuka modal DOKU
  const loadJokulCheckout = (url: string) => {
    const token = url + "?view=iframe";
    const existingModal = document.getElementById("jokul_checkout_modal");
    if (existingModal) {
      existingModal.style.display = "block";
      const iframeElement = existingModal.querySelector("iframe");
      if (iframeElement) iframeElement.src = token;
      return;
    }
    const jokulCheckoutModal = document.createElement("div");
    jokulCheckoutModal.className = "jokul-modal";
    jokulCheckoutModal.id = "jokul_checkout_modal";
    jokulCheckoutModal.innerHTML = `
      <div class="jokul-content">
        <iframe src="${token}" width="100%" height="100%"></iframe>
      </div>
    `;
    document.body.appendChild(jokulCheckoutModal);
  };

  const handleCreateOrder = async () => {
    setIsLoading(true);

    const orderData = {
      productId: product.id,
      productName: product.name,
      quantity,
      material: product.material,
      phoneType: product.phoneType,
      subtotal,
      shippingCost,
      totalPayment,
      shippingAddress: selectedAddress,
      paymentMethod,
    };

    // Panggil backend untuk dapat paymentUrl (contoh hardcode)
    const paymentUrl =
      "https://jokul.doku.com/checkout/link/SU5WFDferd561dfasfasdfae123c20200510090550775";

    loadJokulCheckout(paymentUrl);

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      console.log("Backend response:", data);
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 p-6 bg-gray-50">
      {/* Pilih Alamat */}
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

      {/* Ringkasan Produk */}
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

      {/* Total & Checkout */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Total Pembayaran</CardTitle>
          <p>{paymentMethod}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
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
