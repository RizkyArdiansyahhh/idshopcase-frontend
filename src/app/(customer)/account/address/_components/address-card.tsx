import { TooltipCustom } from "@/components/shared/tooltip";
import { DeleteAddress } from "@/features/address/components/delete-address";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";

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
      className={`flex flex-col gap-1 
    border rounded-sm p-3
    ${isDefault ? "border-foreground" : "pb-6"} 
    `}
    >
      <div className="flex flex-row gap-2">
        <p className="text-app-semibold-sm">{fullname}</p>
        <div className="border-r-2 border-foreground"></div>
        <p className="text-app-light-sm">{phone}</p>
      </div>
      <div className="flex  flex-row justify-between items-center">
        <address className="not-italic text-xs flex flex-col md:flex-row justify-between gap-2">
          {!!detail && <span className="mr-2">{detail}</span>}
          <span>
            {city} - {district}
          </span>
          <span>
            {province} - {postalCode}
          </span>
        </address>
        <div className="flex flex-row gap-3">
          <DeleteAddress id={Number(id)}></DeleteAddress>
          <TooltipCustom message="ubah">
            <Link
              href={`/account/address/edit/${id}`}
              className="text-foreground text-app-extraBold-sm rounded-full bg-background border border-foreground w-7 h-7 flex justify-center items-center hover:bg-foreground hover:text-background transition-all ease-in duration-100"
            >
              <LuPencil className="text-lg" />
            </Link>
          </TooltipCustom>
        </div>
      </div>
      {isDefault && (
        <div>
          <p className="text-xs font-light text-foreground/70 border border-foreground/50 inline py-1 px-2 rounded-sm">
            Utama
          </p>
        </div>
      )}
    </div>
  );
};
