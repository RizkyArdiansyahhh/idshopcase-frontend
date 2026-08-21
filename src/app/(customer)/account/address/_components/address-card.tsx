"use client";

import { TooltipCustom } from "@/components/shared/tooltip";
import { DeleteAddress } from "@/features/address/components/delete-address";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";
import { useTranslations } from "next-intl";

type AddressCardProps = {
  id: string;
  fullname: string;
  phone: string;
  detail: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
};

export const AddressCard = (props: AddressCardProps) => {
  const t = useTranslations("account.address");
  const {
    id,
    fullname,
    phone,
    detail,
    district,
    city,
    province,
    postalCode,
    isDefault,
  } = props;

  return (
    <div
      className={`flex flex-col gap-2 border p-4 transition-all rounded-none bg-white font-sans text-neutral-900 ${
        isDefault ? "border-neutral-900 shadow-2xs" : "border-neutral-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <p className="text-xs font-bold text-neutral-900">{fullname}</p>
        <span className="text-neutral-300">•</span>
        <p className="text-xs font-mono text-neutral-600">{phone}</p>
        {isDefault && (
          <span className="text-[10px] uppercase font-bold text-black bg-neutral-100 border border-neutral-300 px-2 py-0.5 ml-auto">
            {t("isPrimary")}
          </span>
        )}
      </div>

      <div className="flex flex-row justify-between items-start pt-1">
        <address className="not-italic text-xs text-neutral-600 space-y-0.5 leading-relaxed">
          {!!detail && <p className="text-neutral-900">{detail}</p>}
          <p className="text-neutral-500">
            {city}, {district}, {province} ({postalCode})
          </p>
        </address>

        <div className="flex items-center gap-2 shrink-0">
          <DeleteAddress id={id} />
          <TooltipCustom message={t("edit")}>
            <Link
              href={`/account/address/edit/${id}`}
              className="text-neutral-700 hover:text-black border border-neutral-200 hover:border-black w-7 h-7 flex justify-center items-center transition-all cursor-pointer"
            >
              <LuPencil className="text-xs" />
            </Link>
          </TooltipCustom>
        </div>
      </div>
    </div>
  );
};
