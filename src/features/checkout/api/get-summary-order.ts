import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { OrderSummary } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

type GetSummaryOrderItemRequest = {
  addressId: number;
  buyNow?: {
    productId: number;
    variantId: number;
    quantity: number;
    phoneTypeId?: number;
  };
  cartItemIds?: number[];
};

const getSummaryOrder = async (data: GetSummaryOrderItemRequest) => {
  const response = await api.post<{ message: string; data: OrderSummary }>(
    "/order/summary",
    data,
  );
  return response.data.data;
};

type UseGetSummaryOrder = {
  mutationConfig?: MutationConfig<typeof getSummaryOrder>;
};

export const useGetSummaryOrder = ({
  mutationConfig,
}: UseGetSummaryOrder = {}) => {
  return useMutation({
    mutationFn: getSummaryOrder,
    ...mutationConfig,
    onError: (err) => {
      console.error(err);
    },
  });
};
