import { create } from "zustand";
import { CartItem, CheckoutData } from "@/types/api";

interface CheckoutStore {
  data: CheckoutData | null;
  selectedCartIds: CheckoutData[];
  setCheckoutData: (data: CheckoutData) => void;
  setSelectedCartIds: (ids: CheckoutData[]) => void;
  clearCheckoutData: () => void;
  clearSelectedCartIds: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  data: null,
  selectedCartIds: [],
  setCheckoutData: (data) =>
    set({
      data: data,
      selectedCartIds: [],
    }),
  setSelectedCartIds: (ids) =>
    set({
      selectedCartIds: ids,
      data: null,
    }),
  clearCheckoutData: () => set({ data: null }),
  clearSelectedCartIds: () => set({ selectedCartIds: [] }),
}));
