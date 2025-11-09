import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export const VerifySuccess = () => {
  const { replace } = useRouter();
  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <DotLottieReact
          src="https://lottie.host/0fe6219c-fb38-472e-9524-ddb481a28a4f/EaaXmcfcQv.lottie"
          loop
          autoplay
          style={{ width: 200, height: 200 }}
        />
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl font-semibold text-primary">
            Email Anda Berhasil Diverifikasi
          </h1>
          <p className="text-md font-light text-muted-foreground">
            Silahkan login menggunakan akun anda
          </p>
          <Button
            variant={"default"}
            className="w-full"
            type="button"
            onClick={() => replace("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
