/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useGetAddresses } from "@/features/address/api/get-address";
import { useCreateOrder } from "@/features/orders/api/create-order";
import { useCheckoutStore } from "@/store/checkout-store";
import { imageUrlPrimary } from "@/utils/image-utils";
import { useGetProducts } from "@/features/products/api/get-ptoducts";

export type DetailProduct = {
  image: string;
  productName: string;
  price: number;
  material: string | null;
  variant: string | null;
  phoneType: string | null;
  quantity: number;
};

const SLOT_COUNT = 3;

export const useCheckout = () => {
  // State lokal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [customImage, setCustomImage] = useState<(File | undefined)[][]>([]);
  const [previewImage, setPreviewImage] = useState<(string | null)[][]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  // State global
  const dataCheckout = useCheckoutStore((state) => state.data);
  const cartItems = useCheckoutStore((state) => state.selectedCartIds);

  // API
  const { data: userAddresses } = useGetAddresses() || [];
  const { data: products } = useGetProducts();

  // Build detailProduct
  const detailProduct: DetailProduct[] = [];

  if (dataCheckout && (!cartItems || !cartItems.length)) {
    const productItem = products?.find(
      (item) => item.id === dataCheckout.productId
    );
    if (productItem) {
      detailProduct.push({
        image: imageUrlPrimary(productItem?.ProductImages) || "",
        productName: productItem?.name || "",
        price: Number(productItem?.price),
        material: dataCheckout.materialName ?? null,
        variant: dataCheckout.variantName ?? null,
        phoneType: dataCheckout.phoneTypeName ?? null,
        quantity: dataCheckout.quantity,
      });
    }
  } else if (cartItems?.length) {
    cartItems.forEach((item) => {
      const productItem = products?.find((p) => p.id === item.productId);
      if (!productItem) return;
      const material = productItem?.Materials?.find(
        (m) => m.id === item.materialId
      );
      const variant = productItem?.Variants?.find(
        (v) => v.id === item.variantId
      );
      const phoneType = productItem?.PhoneTypes?.find(
        (p) => p.id === item.phoneTypeId
      );
      detailProduct.push({
        image: imageUrlPrimary(productItem?.ProductImages) || "",
        productName: productItem?.name || "",
        price: Number(productItem?.price),
        material: material?.name ?? null,
        variant: variant?.name ?? null,
        phoneType: phoneType?.model ?? null,
        quantity: item.quantity,
      });
    });
  }

  // Inisialisasi state multi-slot jika belum di-set
  useEffect(() => {
    if (!customImage.length && detailProduct.length) {
      setCustomImage(
        detailProduct.map(() => Array(SLOT_COUNT).fill(undefined))
      );
      setPreviewImage(detailProduct.map(() => Array(SLOT_COUNT).fill(null)));
    }
  }, [detailProduct]);

  // Set default address
  useEffect(() => {
    if (userAddresses?.length) setSelectedAddress(userAddresses[0]);
  }, [userAddresses]);

  // Hitung total
  const quantity = dataCheckout?.quantity ?? 0;
  const subtotal =
    detailProduct.reduce((acc, item) => acc + item.price * item.quantity, 0) ??
    0;
  const shippingCost = 240;
  const totalPayment = subtotal + shippingCost;
  const paymentMethod = "DOKU";

  // Create Order API
  const { mutate: createOrder, isPending: createOrderIsLoading } =
    useCreateOrder({
      mutationConfig: {
        onSuccess: (data) => {
          window.loadJokulCheckout?.(data);
        },
      },
    });

  // File handlers
  const handleFileSelect = (
    productIdx: number,
    slotIdx: number,
    file: File
  ) => {
    setCustomImage((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[productIdx][slotIdx] = file;
      return copy;
    });
    setPreviewImage((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[productIdx][slotIdx] = URL.createObjectURL(file);
      return copy;
    });
  };

  const handleRemove = (productIdx: number, slotIdx: number) => {
    setCustomImage((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[productIdx][slotIdx] = undefined;
      return copy;
    });
    setPreviewImage((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[productIdx][slotIdx] = null;
      return copy;
    });
  };

  const handleCreateOrder = () => {
    const formData = new FormData();
    formData.append("addressId", String(selectedAddress?.id ?? 1));

    if (cartItems && cartItems.length > 0) {
      // Jika dari cart
      const selectedItemIds: number[] = cartItems
        .map((item) => item.cartId)
        .filter((id): id is number => id !== undefined);

      formData.append("selectedItemIds", JSON.stringify(selectedItemIds));
    } else if (dataCheckout) {
      // Jika Buy Now
      formData.append(
        "buyNow",
        JSON.stringify({
          productId: dataCheckout.productId,
          quantity: dataCheckout.quantity,
          materialId: dataCheckout.materialId,
          phoneTypeId: dataCheckout.phoneTypeId,
          variantId: dataCheckout.variantId,
        })
      );
    }

    // Custom images
    customImage.flat().forEach((file) => {
      if (file) formData.append("custom_images", file);
    });

    createOrder(formData);
  };

  return {
    detailProduct,
    userAddresses,
    selectedAddress,
    setSelectedAddress,
    shippingCost,
    totalPayment,
    paymentMethod,
    isAddressModalOpen,
    setIsAddressModalOpen,
    createOrderIsLoading,
    quantity,
    handleFileSelect,
    handleRemove,
    customImage,
    previewImage,
    handleCreateOrder,
  };
};
