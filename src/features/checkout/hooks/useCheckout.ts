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
  variant: string | null;
  phoneType: string | null;
  quantity: number;
  category: string;
  slotImage: number;
};

const SLOT_COUNT = 3;

export const useCheckout = () => {
  // State lokal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [customImage, setCustomImage] = useState<(File | undefined)[][]>([]);
  const [previewImage, setPreviewImage] = useState<(string | null)[][]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const dataCheckout = useCheckoutStore((state) => state.data);
  const cartItems = useCheckoutStore((state) => state.selectedCartIds);
  console.log(cartItems, "cartItems");

  console.log(dataCheckout, "dataCheckout");

  const { data: userAddresses } = useGetAddresses() || [];

  const { data: products } = useGetProducts();

  const detailProduct: DetailProduct[] = [];

  if (dataCheckout && (!cartItems || !cartItems.length)) {
    const productItem = products?.find(
      (item) => item.id === dataCheckout.productId
    );
    if (productItem) {
      detailProduct.push({
        image: imageUrlPrimary(productItem?.ProductImages) || "",
        productName: productItem?.name || "",
        price: Number(dataCheckout.variant.price),
        variant: dataCheckout.variant.name ?? null,
        phoneType: dataCheckout.phoneTypeName ?? null,
        quantity: dataCheckout.quantity,
        category: productItem.category,
        slotImage: dataCheckout.variant.max_images,
      });
    }
  } else if (cartItems?.length) {
    cartItems.forEach((item) => {
      const productItem = products?.find((p) => p.id === item.productId);
      if (!productItem) return;

      const variant = productItem?.Variants?.find(
        (v) => v.id === item.variant.id
      );
      const phoneType = productItem?.PhoneTypes?.find(
        (p) => p.id === item.phoneTypeId
      );
      detailProduct.push({
        image: imageUrlPrimary(productItem?.ProductImages) || "",
        productName: productItem?.name || "",
        price: Number(item.variant.price),
        variant: variant?.name ?? null,
        phoneType: phoneType?.model ?? null,
        quantity: item.quantity,
        category: productItem.category,
        slotImage: item.variant.max_images,
      });
    });
  }

  console.log(detailProduct, "detailProduct");

  // Inisialisasi state multi-slot jika belum di-set
  useEffect(() => {
    if (!customImage.length && detailProduct.length) {
      setCustomImage(
        detailProduct.map(() => Array(SLOT_COUNT).fill(undefined))
      );
      setPreviewImage(detailProduct.map(() => Array(SLOT_COUNT).fill(null)));
    }
  }, [detailProduct]);

  useEffect(() => {
    if (userAddresses?.length) setSelectedAddress(userAddresses[0]);
  }, [userAddresses]);

  const quantity = dataCheckout?.quantity ?? 0;
  const subtotal =
    detailProduct.reduce((acc, item) => acc + item.price * item.quantity, 0) ??
    0;
  const shippingCost = 240;
  const totalPayment = subtotal + shippingCost;
  const paymentMethod = "DOKU";

  const { mutate: createOrder, isPending: createOrderIsLoading } =
    useCreateOrder({
      mutationConfig: {
        onSuccess: (data) => {
          window.loadJokulCheckout?.(data);
        },
      },
    });

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

    if (cartItems && cartItems.length) {
      formData.append(
        "selectedItemIds",
        JSON.stringify(cartItems.map((i) => i.cartId))
      );

      let globalFileIndex = 0;
      const customMapData: Record<string, { files: number[] }> = {};

      cartItems.forEach((item, index) => {
        const itemImages = customImage[index] || [];
        const fileIndices: number[] = [];

        itemImages.forEach((file) => {
          if (!file) return;

          formData.append("custom_images", file);

          fileIndices.push(globalFileIndex);
          globalFileIndex++;
        });

        if (fileIndices.length > 0) {
          const cartId = String(item.cartId ?? 0);
          customMapData[cartId] = { files: fileIndices };
        }
      });

      formData.append("customMap", JSON.stringify(customMapData));
    }

    formData.append(
      "buyNow",
      JSON.stringify({
        productId: dataCheckout?.productId,
        quantity: dataCheckout?.quantity,
        variantId: dataCheckout?.variant.id,
        phoneTypeId: dataCheckout?.phoneTypeId,
      })
    );
    const files: File[] = customImage
      .flat()
      .filter((file) => file !== undefined);
    files.forEach((file) => {
      formData.append("custom_images", file);
    });
    formData.append(
      "customMap",
      JSON.stringify({
        buyNow: files.map((_, index) => index),
      })
    );

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
