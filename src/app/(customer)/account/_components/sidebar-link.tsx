import Link from "next/link";

type AboutLinkProps = {
  href: string;
  children: string;
};

export const SidebarLink = (props: AboutLinkProps) => {
  const { href, children } = props;
  return (
    <li className="p-4 rounded-lg border-foreground border-1 font-bold text-xl hover:bg-foreground hover:text-background transition-all duration-200 ease-in-out cursor-pointer">
      <Link href={href}>{children}</Link>
    </li>
  );
};
