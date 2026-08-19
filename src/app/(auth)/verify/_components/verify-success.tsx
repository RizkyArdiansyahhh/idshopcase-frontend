import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export const VerifySuccess = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      replace("/");
    }, 2500);

    return () => clearTimeout(timer);
  }, [replace]);

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <DotLottieReact
          src="https://lottie.host/0fe6219c-fb38-472e-9524-ddb481a28a4f/EaaXmcfcQv.lottie"
          loop
          autoplay
          style={{ width: 200, height: 200 }}
        />
        <div className="flex flex-col gap-3 items-center text-center">
          <h1 className="text-2xl font-semibold text-primary">
            Email Anda Berhasil Diverifikasi
          </h1>
          <p className="text-md font-light text-muted-foreground">
            Selamat datang! Anda akan diarahkan secara otomatis ke halaman utama...
          </p>
          <Button
            variant={"default"}
            className="w-full h-12 bg-black hover:bg-neutral-800 text-white rounded-none uppercase tracking-widest text-xs font-semibold"
            type="button"
            onClick={() => replace("/")}
          >
            MULAI BERBELANJA SEKARANG
          </Button>
        </div>
      </div>
    </>
  );
};
