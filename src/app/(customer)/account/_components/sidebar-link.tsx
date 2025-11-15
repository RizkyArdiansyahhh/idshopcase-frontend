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
      className={`p-4 rounded-md font-bold text-md hover:bg-foreground/5 transition-colors duration-300 ease-in-out cursor-pointer my-1
      ${isActive && "bg-foreground/5 "} `}
      href={href}
    >
      {children}
    </Link>
  );
};
