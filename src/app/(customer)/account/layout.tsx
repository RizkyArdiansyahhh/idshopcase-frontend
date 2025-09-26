import { Sidebar } from "./_components/sidebar";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full w-full flex flex-row py-10">
      <div className="h-full w-2/6 pr-4 bg-background flex flex-col items-end">
        <Sidebar />
      </div>
      <div className="h-full w-4/6 rounded-lg border-foreground border-2">
        {children}
      </div>
    </div>
  );
}
