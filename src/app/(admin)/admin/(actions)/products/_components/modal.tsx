"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export const ModalProduct = () => {
  const { back } = useRouter();
  return (
    <>
      <Dialog open={true} onOpenChange={() => back()}>
        <DialogContent>
          <h1>Product</h1>
        </DialogContent>
      </Dialog>
    </>
  );
};
