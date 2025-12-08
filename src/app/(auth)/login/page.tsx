import { Metadata } from "next";
import { Login } from "./_components/login";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <>
      <Login></Login>
    </>
  );
};

export default LoginPage;
