"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/format-date";
import { ChevronRight } from "lucide-react";
import { RiCustomerServiceFill } from "react-icons/ri";
import { useTranslations } from "next-intl";

type WhatsAppSupportProps = {
  orderId: string | number;
  username: string;
  date: string;
};

export const WhatsAppSupport = (props: WhatsAppSupportProps) => {
  const { orderId, username, date } = props;
  const t = useTranslations("account.orders.orderDetail");

  const handleClick = () => {
    const rawTemplate = t("waGreeting", {
      orderId: String(orderId),
      username: username || "-",
      date: formatDate(date),
    });

    const url = `https://wa.me/6285117453862?text=${encodeURIComponent(
      rawTemplate,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-row justify-between items-center hover:underline transition-all duration-200 ease-in-out cursor-pointer"
    >
      <p className="text-xs lg:text-sm text-foreground/50">
        {t("helpSubtitle")}
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <ChevronRight size={20} className="cursor-pointer text-foreground/70" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-row items-center gap-1">
            <RiCustomerServiceFill />
            <p>{t("customerService")}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
