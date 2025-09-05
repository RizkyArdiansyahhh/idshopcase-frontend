import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <div className="w-screen h-screen bg-white flex">
        <div className="w-3/5 h-full relative p-3">
          <div className="w-full h-full full bg-amber-300 rounded-2xl bg-[url('/images/login-cover.jpg')] bg-cover relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-primary"></div>
          </div>
        </div>
        <div className="w-2/5 h-full  flex justify-center items-center">
          <div className="w-3/5 h-3/5  p-2">
            <h1 className=" text-4xl font-bold mb-2">Masuk</h1>
            <p>Masuk ke akun Anda untuk mengakses layanan kami.</p>
            <form action="#" className="flex flex-col gap-5 mt-7">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email"></Input>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative w-full">
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="pr-10"
                  ></Input>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                    <EyeClosed className="text-ring" />
                  </div>
                </div>
              </div>
              <Button className="font-bold">Masuk</Button>
              <div className="flex justify-center gap-1">
                <p>Kamu belum memiliki akun?</p>
                <Link href="/register" className="text-primary font-bold">
                  Daftar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
