/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useGetAddresses } from "@/features/address/api/get-address";
import { useCreateOrder } from "@/features/orders/api/create-order";
import { useCheckoutStore } from "@/store/checkout-store";
import { imageUrlPrimary } from "@/utils/image-utils";
import { useGetProducts } from "@/features/products/api/get-ptoducts";
import { useRouter } from "next/navigation";
import { ur } from "zod/v4/locales";

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

  const { replace } = useRouter();

  const dataCheckout = useCheckoutStore((state) => state.data);
  const cartItems = useCheckoutStore((state) => state.selectedCartIds);
  console.log(cartItems, "cartItems");

  const { data: userAddresses } = useGetAddresses() || [];
  const { data: products } = useGetProducts();
  const detailProduct: DetailProduct[] = [];

  const summaryOrderRequest: any = {};

  if (dataCheckout && (!cartItems || !cartItems.length)) {
    const productItem = products?.find(
      (item) => item.id === dataCheckout.productId,
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
      summaryOrderRequest.buyNow = {
        variantId: dataCheckout.variant.id,
        quantity: dataCheckout.quantity,
        phoneTypeId: dataCheckout.phoneTypeId,
      };
    }
  } else if (cartItems?.length) {
    const cartItemIds: number[] = [];

    cartItems.forEach((item) => {
      const productItem = products?.find((p) => p.id === item.productId);
      if (!productItem) return;

      const variant = productItem?.Variants?.find(
        (v) => v.id === item.variant.id,
      );
      const phoneType = productItem?.PhoneTypes?.find(
        (p) => p.id === item.phoneTypeId,
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
      if (item.cartId !== undefined) {
        cartItemIds.push(item.cartId);
      }
    });
    summaryOrderRequest.selectedItemIds = cartItemIds;
  }

  console.log(detailProduct, "detailProduct");
  console.log(summaryOrderRequest, "summaryOrderRequest");

  // Inisialisasi state multi-slot jika belum di-set
  useEffect(() => {
    if (!customImage.length && detailProduct.length) {
      setCustomImage(
        detailProduct.map(() => Array(SLOT_COUNT).fill(undefined)),
      );
      setPreviewImage(detailProduct.map(() => Array(SLOT_COUNT).fill(null)));
    }
  }, [detailProduct]);

  useEffect(() => {
    if (userAddresses?.length) setSelectedAddress(userAddresses[0]);
  }, [userAddresses]);

  const { mutate: createOrder, isPending: createOrderIsLoading } =
    useCreateOrder({
      mutationConfig: {
        onSuccess: (data) => {
          const urlDoku = data.checkout.response.payment.url;
          // console.log(data, "ini data checkout");
          // replace(`/order/${data.order.id}/payment`);
          // window.loadJokulCheckout?.(urlDoku);
        },
      },
    });

  const handleFileSelect = (
    productIdx: number,
    slotIdx: number,
    file: File,
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

    if (cartItems?.length) {
      const customMapCart: Record<string, { files: number[] }> = {};
      let globalFileIndex = 0;

      cartItems.forEach((item, index) => {
        const itemImages: (File | undefined)[] = customImage[index] || [];
        const fileIndices: number[] = [];

        itemImages.forEach((file) => {
          if (!file) return;
          formData.append("custom_images", file);
          fileIndices.push(globalFileIndex++);
        });

        if (fileIndices.length) {
          customMapCart[String(item.cartId)] = { files: fileIndices };
        }
      });

      formData.append(
        "selectedItemIds",
        JSON.stringify(cartItems.map((i) => i.cartId)),
      );
      formData.append("customMap", JSON.stringify(customMapCart));
    }
    if (dataCheckout) {
      const buyNowFiles: File[] =
        customImage[cartItems?.length || 0]?.filter(
          (file): file is File => file !== undefined,
        ) || [];
      const filteredFiles = buyNowFiles.filter(Boolean) as File[];

      filteredFiles.forEach((file) => formData.append("custom_images", file));

      formData.append(
        "buyNow",
        JSON.stringify({
          productId: dataCheckout.productId,
          quantity: dataCheckout.quantity,
          variantId: dataCheckout.variant?.id ?? null,
          phoneTypeId: dataCheckout.phoneTypeId ?? null,
        }),
      );

      formData.append(
        "customMap",
        JSON.stringify({ buyNow: filteredFiles.map((_, i) => i) }),
      );
    }

    createOrder(formData);
  };

  const isImageValid = (productIdx: number) => {
    return previewImage[productIdx]?.some(Boolean);
  };

  const isAllImageValid = detailProduct.every((_, idx) => isImageValid(idx));

  return {
    detailProduct,
    selectedAddress,
    setSelectedAddress,
    isAddressModalOpen,
    setIsAddressModalOpen,
    createOrderIsLoading,
    handleFileSelect,
    handleRemove,
    previewImage,
    handleCreateOrder,
    summaryOrderRequest,
    isAllImageValid,
    isImageValid,
  };
};
