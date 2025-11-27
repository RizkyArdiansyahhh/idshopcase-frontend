"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IoHomeOutline,
  IoPersonOutline,
  IoChatbubbleEllipsesOutline,
  IoCartOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export function SidebarFloating() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const menu = [
    { icon: <IoHomeOutline />, path: "/account/profile" },
    { icon: <IoPersonOutline />, path: "/account/info" },
    { icon: <IoChatbubbleEllipsesOutline />, path: "/account/messages" },
    { icon: <IoStatsChartOutline />, path: "/account/stats" },
    { icon: <IoCartOutline />, path: "/account/orders" },
    { icon: <IoSettingsOutline />, path: "/account/settings" },
  ];

  return (
    <div className="md:hidden">
      {!open && (
        <button
          aria-label="Open sidebar"
          onClick={() => setOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-r-full p-2"
        >
          <FiChevronRight size={20} />
        </button>
      )}

      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50
          w-16      /* panel width */
          bg-white rounded-r-3xl p-3 flex flex-col items-center gap-6 shadow-xl
          transition-transform transition-opacity duration-250 ease-out
          ${
            open
              ? "translate-x-0 opacity-100"
              : "-translate-x-12 opacity-0 pointer-events-none"
          }
        `}
      >
        <button
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="absolute -right-6 top-2 bg-white shadow-md rounded-full p-2"
        >
          <FiChevronLeft size={18} />
        </button>

        {/* items */}
        <nav className="mt-6 flex flex-col gap-4">
          {menu.map((item, i) => {
            const active = path?.startsWith(item.path);
            return (
              <Link
                key={i}
                href={item.path}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition
                  ${
                    active
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-foreground/5"
                  }
                `}
                aria-current={active ? "page" : undefined}
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
