import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminLayout from "@/app/(admin)/admin/layout";
import * as nextNavigation from "next/navigation";

jest.spyOn(nextNavigation, "useRouter").mockImplementation(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
}));
jest.spyOn(nextNavigation, "usePathname").mockImplementation(() => "/admin");
jest.spyOn(nextNavigation, "useParams").mockImplementation(() => ({}));
jest.spyOn(nextNavigation, "useSearchParams").mockImplementation(
  () =>
    ({
      get: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
);

jest.mock("@/features/auth/components/protected-route", () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="protected-route">{children}</div>
  ),
}));

jest.mock("@/components/ui/sidebar", () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
  SidebarInset: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-inset">{children}</div>
  ),
}));

jest.mock("@/app/(admin)/admin/components/app-sidebar", () => ({
  AppSidebar: () => <div data-testid="app-sidebar">Sidebar</div>,
}));

jest.mock("@/app/(admin)/admin/components/site-header", () => ({
  SiteHeader: () => <div data-testid="site-header">Header</div>,
}));

const MockDashboard = () => <div>Dashboard Page</div>;
const MockOrders = () => <div>Orders Page</div>;

describe("AdminLayout", () => {
  it("renders layout and children correctly", () => {
    const { asFragment } = render(
      <AdminLayout>
        <MockDashboard />
        <MockOrders />
      </AdminLayout>
    );

    expect(screen.getByTestId("protected-route")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-provider")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-inset")).toBeInTheDocument();
    expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("site-header")).toBeInTheDocument();

    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    expect(screen.getByText("Orders Page")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
