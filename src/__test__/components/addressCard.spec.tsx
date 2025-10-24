import { render, screen } from "@testing-library/react";
import { AddressCard } from "../../app/(customer)/account/address/_components/address-card";
import "@testing-library/jest-dom";

describe("AddressCard Component", () => {
  const mockAddress = {
    id: "1",
    fullname: "Rizky Ardiansyah",
    phone: "08123456789",
    detail: "Jl. Melati No. 10",
    village: "Sukamaju",
    district: "Pekanbaru Kota",
    city: "Pekanbaru",
    province: "Riau",
    postalCode: "28292",
    isDefault: true,
  };

  test("menampilkan nama dan nomor telepon dengan benar", () => {
    render(<AddressCard {...mockAddress} />);

    expect(screen.getByText("Rendi wahyudi")).toBeInTheDocument();
    expect(screen.getByText("08123456789")).toBeInTheDocument();
  });

  test("menampilkan detail alamat dengan benar", () => {
    render(<AddressCard {...mockAddress} />);
    expect(screen.getByText(/Jl. Melati No. 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Pekanbaru/i)).toBeInTheDocument();
  });

  test("menampilkan label 'Utama' jika isDefault = true", () => {
    render(<AddressCard {...mockAddress} />);
    expect(screen.getByText("Utama")).toBeInTheDocument();
  });

  test("tidak menampilkan label 'Utama' jika isDefault = false", () => {
    render(<AddressCard {...mockAddress} isDefault={false} />);
    expect(screen.queryByText("Utama")).not.toBeInTheDocument();
  });

  test("memiliki link edit yang benar", () => {
    render(<AddressCard {...mockAddress} />);
    const link = screen.getByRole("link", { name: /UBAH/i });
    expect(link).toHaveAttribute("href", "/account/address/edit/1");
  });
});
