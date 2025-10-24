import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SidebarLink } from "../../app/(customer)/account/_components/sidebar-link";

jest.mock("next/link", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SidebarLink = ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  SidebarLink.displayName = "SidebarLink";
  return SidebarLink;
});

describe("SidebarLink Component", () => {
  test("menampilkan teks link dengan benar", () => {
    render(<SidebarLink href="/about">Tentang Kami</SidebarLink>);
    expect(screen.getByText("Tentang Kami")).toBeInTheDocument();
  });

  test("link memiliki href yang sesuai", () => {
    render(<SidebarLink href="/contact">Kontak</SidebarLink>);
    const link = screen.getByRole("link", { name: /Kontak/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  test("link aktif memiliki class bg-foreground dan text-background", () => {
    render(
      <SidebarLink href="/profile" isActive>
        Profil
      </SidebarLink>
    );
    const link = screen.getByText("Profil");
    expect(link).toHaveClass("bg-foreground");
    expect(link).toHaveClass("text-background");
  });

  test("link tidak aktif tidak memiliki class bg-foreground", () => {
    render(<SidebarLink href="/shop">Toko</SidebarLink>);
    const link = screen.getByText("Toko");
    expect(link).not.toHaveClass("bg-foreground");
  });
});
