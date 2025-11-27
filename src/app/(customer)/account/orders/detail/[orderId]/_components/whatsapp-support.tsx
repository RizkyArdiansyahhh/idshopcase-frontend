import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/format-date";
import { ChevronRight } from "lucide-react";
import { RiCustomerServiceFill } from "react-icons/ri";

type WhatsAppSupportProps = {
  orderId: number;
  username: string;
  date: string;
};

export const WhatsAppSupport = (props: WhatsAppSupportProps) => {
  const { orderId, username, date } = props;
  const handleClick = () => {
    const message = `Halo Customer Service,
                    Saya ingin menanyakan status pesanan saya. 
                    Berikut informasi pesanan saya:

                    - Nomor Order: INV-${orderId}
                    - Nama Pemesan: ${username}
                    - Tanggal Pemesanan: ${formatDate(date)}
                    `;

    const url = `https://wa.me/6285117453862?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center hover:underline transition-all duration-200 ease-in-out">
        <p className="text-sm text-foreground/50">
          Jika ada pertanyaan, silahkan hubungi customer service kami
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <ChevronRight
              size={20}
              onClick={handleClick}
              className="cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-row items-center gap-1">
              <RiCustomerServiceFill />
              <p>Customer Service</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};
