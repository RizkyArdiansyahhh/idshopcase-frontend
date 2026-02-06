import { Metadata } from "next";
import { Register } from "./_components/register";

export const metadata: Metadata = {
  title: "Register",
  robots: {
    index: false,
    follow: false,
  },
};

const RegisterPage = () => {
  return (
    <>
      <Register></Register>
    </>
  );
};

export default RegisterPage;
