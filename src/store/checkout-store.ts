import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CheckoutData } from "@/types/api";

interface CheckoutStore {
  data: CheckoutData | null;
  selectedCartIds: CheckoutData[];
  setCheckoutData: (data: CheckoutData) => void;
  setSelectedCartIds: (ids: CheckoutData[]) => void;
  clearCheckoutData: () => void;
  clearSelectedCartIds: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "idshopcase-checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
