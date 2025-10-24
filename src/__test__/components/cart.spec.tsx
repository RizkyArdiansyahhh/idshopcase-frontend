import { render, screen } from "@testing-library/react";
import { Cart } from "@/app/(customer)/cart/_components/cart";

// Mock CartList supaya fokus pada Cart saja
jest.mock("@/features/cart/components/cart-list", () => ({
  CartList: () => <div>Mocked CartList</div>,
}));

describe("Cart component", () => {
  it("renders header labels", () => {
    render(<Cart />);
    const headers = [
      "Produk",
      "Harga Satuan",
      "Kuantitas",
      "Total Harga",
      "Aksi",
    ];
    headers.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("renders mocked CartList component", () => {
    render(<Cart />);
    expect(screen.getByText("Mocked CartList")).toBeInTheDocument();
  });

  it("renders footer with checkbox and checkout link", () => {
    render(<Cart />);
    expect(screen.getByLabelText(/Pilih Semua/i)).toBeInTheDocument();
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });
});
