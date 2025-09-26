import { Navbar } from "@/components/layouts/navbar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex flex-col items-center py-2">
      <Navbar isBlur={false} />
      <div className="flex flex-row h-full w-full justify-center">
        <div className="h-full w-[93%]">{children}</div>
      </div>
    </div>
  );
}
