import Link from "next/link";

type AddressCardProps = {
  id: string;
  fullname: string;
  phone: string;
  detail: string;
  village: string;
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
    village,
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
      <div className="flex flex-row justify-between items-center">
        <address className="not-italic text-xs">
          <span>{detail}</span>
          <span>{village}</span>
          <span>
            {city} - {district}
          </span>
          <span>
            {province} - {postalCode}
          </span>
        </address>
        <Link
          href={`/account/address/edit/${id}`}
          className="text-[#003077] text-app-extraBold-sm"
        >
          UBAH
        </Link>
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
