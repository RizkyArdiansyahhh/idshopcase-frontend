"use client";
import { useState, useEffect } from "react";
import { useGetAddresses } from "@/features/address/api/get-address";
import { useCreateOrder } from "@/features/orders/api/create-order";
import { useGetProduct } from "@/features/products/api/get-productById";
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

export const useCheckout = () => {
  // State lokal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  // State global
  const dataCheckout = useCheckoutStore((state) => state.data);
  const cartItems = useCheckoutStore((state) => state.selectedCartIds);

  console.log(dataCheckout);
  console.log(cartItems);

  // API
  const { data: userAddresses } = useGetAddresses() || [];
  const { data: product } = useGetProducts();

  // Set default address
  useEffect(() => {
    if (userAddresses?.length) setSelectedAddress(userAddresses[0]);
  }, [userAddresses]);

  // Build detailProduct array
  const detailProduct: DetailProduct[] = [];

  if (dataCheckout && (!cartItems || !cartItems.length)) {
    if (product) {
      const productItem = product.find(
        (item) => item.id === dataCheckout.productId
      );
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
  } else if (cartItems && cartItems.length) {
    cartItems.forEach((item) => {
      const productItem = product?.find((prod) => prod.id === item.productId);
      const material = productItem?.Materials?.find(
        (mat) => mat.id === item.materialId
      );
      const variant = productItem?.Variants?.find(
        (varian) => varian.id === item.variantId
      );
      const phoneType = productItem?.PhoneTypes?.find(
        (phone) => phone.id === item.phoneTypeId
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

  console.log(detailProduct, "ini detal product");

  const quantity = dataCheckout?.quantity ?? 0;
  const subtotal =
    detailProduct.reduce((acc, item) => acc + item.price * quantity, 0) ?? 0;
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCreateOrder = () => {
    const selectedItemIds: number[] =
      cartItems
        ?.map((item) => item.cartId)
        .filter((id): id is number => id !== undefined) ?? [];

    createOrder(
      {
        addressId: selectedAddress?.id ?? 1,
        selectedItemIds,
      },
      {
        onError: (err) => {
          console.error("🔥 SERVER ERROR:", err);
        },
      }
    );
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
    handleImageChange,
    customImage,
    setPreviewImage,
    previewImage,
    handleCreateOrder,
  };
};
