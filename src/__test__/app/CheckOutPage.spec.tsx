// __tests__/CheckOutPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CheckOutPage from "@/app/(customer)/order/page";

describe("CheckOutPage", () => {
  beforeEach(() => {
    render(<CheckOutPage />);
  });

  it("renders shipping and address section", () => {
    expect(screen.getByText("Pengiriman")).toBeInTheDocument();
    expect(screen.getByText("Alamat Pengiriman")).toBeInTheDocument();
  });

  it("renders product information", () => {
    expect(
      screen.getByText(/case iphone 16 pro max custom/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Material Diamond Impact")).toBeInTheDocument();
    expect(screen.getByText("Rp 120000")).toBeInTheDocument();
  });

  it("renders quantity buttons", () => {
    const addButton =
      screen.getByText("+") || screen.getByRole("button", { name: /add/i });
    const removeButton =
      screen.getByText("-") || screen.getByRole("button", { name: /remove/i });

    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  it("renders total payment and order button", () => {
    expect(screen.getByText(/Total Pembayaran/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Buat Pesanan/i })
    ).toBeInTheDocument();
  });

  // contoh interaksi sederhana jika pakai state quantity
  it("increments and decrements quantity", () => {
    const quantityDisplay = screen.getByText("1");
    const addButton = screen.getByText("+");
    const removeButton = screen.getByText("-");

    fireEvent.click(addButton);
    expect(quantityDisplay.textContent).toBe("2");

    fireEvent.click(removeButton);
    expect(quantityDisplay.textContent).toBe("1");
  });
});
