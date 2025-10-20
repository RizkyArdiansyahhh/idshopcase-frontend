import { Button } from "@/components/ui/button";

const CheckOutPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 py-2">
      <div className="w-full h-[30%] bg border rounded-xs grid grid-cols-6 p-10">
        <p className="text-lg font-semibold text-foreground col-span-2">
          Pengiriman
        </p>
        <div className="col-span-3">
          <p className="text-lg font-medium text-foreground">Regular</p>
          <div className="font-light text-sm">
            <p>Garansi Tiba : 27 - 29 Jul</p>
            <p>Voucher s/d Rp10.000 jika pesanan belum tiba 29 Jul 2025.</p>
          </div>
        </div>
        <div>
          <Button className="font-semibold text-lg" variant={"link"}>
            Ubah
          </Button>
        </div>
      </div>
      <div className="w-full h-[10%] bg border rounded-xs"></div>
      <div className="w-full h-[30%] bg border rounded-xs"></div>
      <div className="w-full h-[30%] bg border rounded-xs"></div>
    </div>
  );
};

export default CheckOutPage;
