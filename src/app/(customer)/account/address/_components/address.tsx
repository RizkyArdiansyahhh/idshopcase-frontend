"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AddressesList } from "@/features/address/components/addresses-list";
import { Separator } from "@/components/ui/separator";
import { useGetAddresses } from "@/features/address/api/get-address";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export const Address = () => {
  const t = useTranslations("account.address");
  const { push } = useRouter();
  const { data: addresses } = useGetAddresses();
  const isMaxAddress = (addresses?.length || 0) >= 5;

  const handleAddAddress = () => {
    if (!isMaxAddress) {
      push("/account/address/new");
    }
  };

  return (
    <div className="w-full flex flex-col font-sans select-none space-y-6">
      <div className="p-5 sm:p-7 rounded-2xl border border-neutral-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
            {t("listTitle")} ({addresses?.length || 0}/5)
          </p>
          {isMaxAddress && (
            <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {t("maxReached")}
            </span>
          )}
        </div>
        <AddressesList />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Button
          className="h-10 px-5 text-xs font-bold bg-black hover:bg-neutral-800 text-white rounded-full transition-all cursor-pointer"
          variant={isMaxAddress ? "secondary" : "default"}
          disabled={isMaxAddress}
          onClick={handleAddAddress}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          {t("addNew")}
        </Button>
        {isMaxAddress && (
          <p className="text-xs text-neutral-500">
            {t("maxNote")}
          </p>
        )}
      </div>
    </div>
  );
};
