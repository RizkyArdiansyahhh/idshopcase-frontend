"use client";

import { MapPinHouse, Package2, PackageSearch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export function BottomNavigation() {
  const pathname = usePathname();

  const menu = [
    {
      icon: <FaRegUser size={17} />,
      path: "/account/profile",
      label: "Profile",
    },
    {
      icon: <MapPinHouse size={17} />,
      path: "/account/address",
      label: "Alamat",
    },
    { icon: <Package2 size={17} />, path: "/account/orders", label: "Pesanan" },
    {
      icon: <PackageSearch size={17} />,
      path: "/account/track-order",
      label: "Lacak",
    },
    {
      icon: <IoSettingsOutline size={17} />,
      path: "/account/update-password",
      label: "Password",
    },
  ];

  return (
    <nav
      className="
        fixed bottom-2 left-1/2 -translate-x-1/2 px-2
        w-[95%] h-16 z-50
        rounded-xl
        md:hidden
        flex justify-around items-center
        backdrop-blur-md bg-foreground
      "
    >
      {menu.map((item, i) => {
        const active = pathname?.startsWith(item.path);

        return (
          <Link
            key={i}
            href={item.path}
            className="flex items-center justify-center"
          >
            <div
              className={`
                flex items-center gap-2
                px-3 py-2 rounded-full
                transition-all duration-300 ease-out
                ${active ? "bg-background text-foreground" : "text-background"}
              `}
            >
              <div>{item.icon}</div>

              <span
                className={`
                  text-xs font-semibold
                  overflow-hidden whitespace-nowrap
                  transition-all duration-300 ease-out
                  ${
                    active
                      ? "opacity-100 max-w-[80px] scale-100"
                      : "opacity-0 max-w-0 scale-95"
                  }
                `}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
