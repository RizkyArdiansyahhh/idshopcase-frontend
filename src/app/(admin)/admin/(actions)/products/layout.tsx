import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Kelola Produk",
    template: "%s | Admin | IDShopCase",
  },
};

export default function ProductsAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
