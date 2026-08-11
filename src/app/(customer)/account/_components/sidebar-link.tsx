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
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors duration-200 cursor-pointer ${
        isActive
          ? "bg-foreground text-background shadow-xs"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      }`}
      href={href}
    >
      {icon && (
        <span className={isActive ? "text-background" : "text-muted-foreground"}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </Link>
  );
};
