import { Metadata } from "next";
import { AuthLayout as AuthLayoutComponent } from "./_components/auth-layout";

export const metadata: Metadata = {
  title: {
    default: "Idshopcase",
    template: "%s | Masuk / Daftar | Idshopcase",
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
};

export default AuthLayout;
