"use client";
import { useGetAddresses } from "@/features/address/api/get-address";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

export const useCheckout = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Data mock
  const product = {
    id: "prod_123",
    name: "Case iPhone 16 Pro Max Custom",
    price: 150000,
    imageUrl: "/images/products/custom-case/custom-case-2.webp",
    material: "Diamond Impact",
    phoneType: "iPhone",
  };

  const { data: userAddresses } = useGetAddresses() || [];
  console.log(userAddresses?.[0].recipient_name);

  const addressPrimary =
    userAddresses?.find((a) => a.is_primary) || userAddresses?.[0];

  const [selectedAddress, setSelectedAddress] = useState(userAddresses?.[0]);
  const shippingCost = 240;
  const paymentMethod = "DOKU";

  const subtotal = product.price * quantity;
  const totalPayment = subtotal + shippingCost;

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));

  useEffect(() => {
    const cssJokul = document.createElement("link");
    cssJokul.rel = "stylesheet";
    cssJokul.href =
      "https://jokul.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.css";
    document.head.appendChild(cssJokul);
  }, []);

  const loadJokulCheckout = (url: string) => {
    const token = url + "?view=iframe";
    let modal = document.getElementById("jokul_checkout_modal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "jokul_checkout_modal";
      modal.innerHTML = `
        <div class="jokul-content">
          <iframe src="${token}"></iframe>
        </div>`;
      document.body.appendChild(modal);
    } else {
      const iframe = modal.querySelector("iframe");
      if (iframe) iframe.src = token;
      modal.style.display = "block";
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedAddress?.id) {
      console.error("❌ Alamat belum dipilih!");
      return;
    }

    console.log("🟡 [STEP 1] Mulai membuat order...");
    console.log("📦 Payload dikirim:", {
      addressId: selectedAddress.id,
      selectedItemIds: [3],
    });

    setIsLoading(true);
    const startTime = performance.now();

    try {
      console.log("🟡 [STEP 2] Mengirim request ke backend...");
      const res = await api.post("/order", {
        addressId: selectedAddress.id,
        selectedItemIds: [3],
      });

      console.log("🟢 [STEP 3] Respons diterima:", res);

      const resData = res.data;
      if (!resData) throw new Error("Order gagal - respons kosong");

      const paymentUrl = resData?.checkout?.response?.payment?.url;
      console.log("🟢 [STEP 4] Payment URL:", paymentUrl);

      if (paymentUrl) {
        console.log("🟡 [STEP 5] Memuat halaman Jokul...");
        loadJokulCheckout(paymentUrl);
      } else {
        console.warn("⚠️ Tidak ada URL pembayaran di respons");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ [ERROR] Gagal membuat order:", err?.response || err);
    } finally {
      const endTime = performance.now();
      console.log(
        `⏱️ [WAKTU] Total waktu eksekusi: ${(endTime - startTime).toFixed(
          2
        )} ms`
      );
      setIsLoading(false);
    }
  };

  return {
    product,
    userAddresses,
    selectedAddress,
    setSelectedAddress,
    isAddressModalOpen,
    setIsAddressModalOpen,
    quantity,
    handleIncrease,
    handleDecrease,
    subtotal,
    shippingCost,
    totalPayment,
    paymentMethod,
    handleCreateOrder,
    isLoading,
    handleImageChange,
    previewImage,
    setPreviewImage,
  };
};
