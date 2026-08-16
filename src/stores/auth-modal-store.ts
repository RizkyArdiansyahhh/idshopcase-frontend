import { create } from "zustand";

export type AuthModalReason = "session_expired" | "login_required";

interface AuthModalState {
  isOpen: boolean;
  reason: AuthModalReason;
  redirectUrl?: string;
  openModal: (options?: { reason?: AuthModalReason; redirectUrl?: string }) => void;
  closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  reason: "login_required",
  redirectUrl: undefined,
  openModal: (options) =>
    set({
      isOpen: true,
      reason: options?.reason ?? "login_required",
      redirectUrl: options?.redirectUrl,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      redirectUrl: undefined,
    }),
}));
