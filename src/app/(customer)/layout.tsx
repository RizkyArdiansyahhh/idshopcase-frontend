import { Navbar } from "@/components/layouts/navbar";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute allowedRoles={["USER"]} redirectTo="/login">
      <div className="h-screen w-screen flex flex-col items-center py-2">
        <Navbar isBlur={false} />
        <div className="flex flex-row h-full w-full justify-center">
          <div className="h-full w-[93%]">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
