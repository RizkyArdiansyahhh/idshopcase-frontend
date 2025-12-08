import { Metadata } from "next";
import { AuthLayout as AuthLayoutComponent } from "./_components/auth-layout";

export const metadata: Metadata = {
  title: {
    default: "IDSHOPCASE",
    template: "%s | Masuk / Daftar | IDShopCase",
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
};

export default AuthLayout;
