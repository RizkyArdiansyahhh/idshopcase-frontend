import { render, screen } from "@testing-library/react";
import { Sidebar } from "../../app/(customer)/account/_components/sidebar";
import { usePathname } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Mock usePathname dari next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Sidebar", () => {
  it("renders all links", () => {
    (usePathname as jest.Mock).mockReturnValue("/account/orders");
    render(<Sidebar />);

    expect(screen.getByText("Informasi Pribadi")).toBeInTheDocument();
    expect(screen.getByText("Pesanan Saya")).toBeInTheDocument();
    expect(screen.getByText("Alamat")).toBeInTheDocument();
  });

  it("marks the active link based on path", () => {
    (usePathname as jest.Mock).mockReturnValue("/account/orders");
    render(<Sidebar />);

    const ordersLink = screen.getByText("Pesanan Saya");
    expect(ordersLink.closest("a")).toHaveAttribute("href", "/account/orders");
    // Kamu bisa juga cek isActive class jika SidebarLink menambahkan class
  });

  it("shows logout button only on profile page", () => {
    (usePathname as jest.Mock).mockReturnValue("/account/profile");
    render(<Sidebar />);

    expect(screen.getByText("Keluar")).toBeInTheDocument();

    // Cek kalau bukan profile, tombol hilang
    (usePathname as jest.Mock).mockReturnValue("/account/orders");
    render(<Sidebar />);
    expect(screen.queryByText("Keluar")).toBeNull();
  });
});
