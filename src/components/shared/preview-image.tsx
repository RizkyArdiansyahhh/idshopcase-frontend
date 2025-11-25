import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadCustomImage } from "@/features/orders/api/donwload-custom-image";
import { Save } from "lucide-react";
import Image from "next/image";

type PreviewImageProps = {
  children: React.ReactNode;
  imageUrl: string;
  imageId: number;
};
export const PreviewImage = (props: PreviewImageProps) => {
  const { children, imageUrl, imageId } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90vw] h-[90vh] max-w-none flex flex-col p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="text-center">
            Preview Custom Image
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 w-full h-full relative overflow-hidden">
          <Image
            src={imageUrl}
            alt="Preview-Image"
            fill
            className="object-contain"
          />
        </div>
        <DialogFooter>
          <div className="w-full h-fit p-4 flex flex-row justify-end">
            <Button
              onClick={() => {
                downloadCustomImage(imageId);
              }}
            >
              <Save />
              Unduh Gambar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
