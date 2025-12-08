import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Kelola Pesanan",
    template: "%s | Admin | IDShopCase",
  },
};

export default function OrdersAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
