import Link from "next/link";

type TabLinkOrderProps = {
  href: string;
  children: string;
  isActive?: boolean;
  count?: number;
};

export const TabLinkOrder = (props: TabLinkOrderProps) => {
  const { href, children, isActive, count } = props;
  return (
    <Link
      className={`px-4 py-2 font-semibold ${
        isActive && "rounded-sm text-background bg-foreground/70"
      } transtition-all duration-300 ease-in-out`}
      href={href}
      replace
    >
      {children}
      {count && `(${count})`}
    </Link>
  );
};
