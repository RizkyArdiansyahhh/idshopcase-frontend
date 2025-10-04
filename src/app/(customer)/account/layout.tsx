"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className="h-full w-full flex flex-row py-10">
      <div className="h-full w-2/6 pr-4 bg-background flex flex-col items-end">
        <Sidebar />
      </div>
      <div
        className={`max-h-fit p-2 w-4/6 rounded-lg ${
          pathName === "/account/profile"
            ? "border-transparent"
            : "border-foreground"
        } border-2`}
      >
        {children}
      </div>
    </div>
  );
}
