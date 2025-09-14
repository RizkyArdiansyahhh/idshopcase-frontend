import Link from "next/link";

type AboutLinkProps = {
  href: string;
  children: string;
};

export const FooterLink = (props: AboutLinkProps) => {
  const { href, children } = props;
  return (
    <li className="py-2 text-2xl font-light hover:underline hover:cursor-pointer transition-all duration-200">
      <Link href={href}>{children}</Link>
    </li>
  );
};
