import Link from "next/link";

type AboutLinkProps = {
  href: string;
  children: string;
  isActive?: boolean;
};

export const SidebarLink = (props: AboutLinkProps) => {
  const { href, children, isActive } = props;
  return (
    <Link
      className={`p-4 rounded-lg border-foreground border font-bold text-xl hover:bg-foreground hover:text-background transition-colors duration-300 ease-in-out cursor-pointer
      ${isActive && "bg-foreground text-background"} `}
      href={href}
    >
      {children}
    </Link>
  );
};
