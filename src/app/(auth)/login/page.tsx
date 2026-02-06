import { Metadata } from "next";
import { Login } from "./_components/login";
import { GuestRoute } from "@/features/auth/components/guest-route";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <>
      <GuestRoute>
        <Login></Login>
      </GuestRoute>
    </>
  );
};

export default LoginPage;
