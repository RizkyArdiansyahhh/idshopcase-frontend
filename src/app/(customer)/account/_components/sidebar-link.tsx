import Link from "next/link";
import { ReactNode } from "react";

type SidebarLinkProps = {
  href: string;
  children: string;
  icon?: ReactNode;
  isActive?: boolean;
};

export const SidebarLink = (props: SidebarLinkProps) => {
  const { href, children, icon, isActive } = props;
  return (
    <Link
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-none font-semibold text-xs transition-colors duration-150 cursor-pointer ${
        isActive
          ? "bg-black text-white"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
      }`}
      href={href}
    >
      {icon && (
        <span className={isActive ? "text-white" : "text-neutral-500"}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </Link>
  );
};
