import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { Metadata } from "next";
// import { ProtectedRoute } from "@/features/auth/components/protected-route";

export const metadata: Metadata = {
  title: {
    default: "IDSHOPCASE",
    template: "%s | Admin | IDSHOPCASE",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin"]}>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset className="min-w-0 max-w-full overflow-x-hidden">
            <SiteHeader />
            <div className="flex-1 w-full min-w-0 max-w-full overflow-x-hidden">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    </>
  );
}
