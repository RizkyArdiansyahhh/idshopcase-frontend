import { render, screen } from "@testing-library/react";
import DetailProductPage from "../../app/(customer)/products/detail/[id]/page";

// Mock child components
jest.mock("@/features/checkout/components/form-checkout", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FormCheckout: ({ children }: any) => <div>{children}</div>,
}));
jest.mock("./components/combo-box", () => ({
  Combobox: () => <div>Mocked Combobox</div>,
}));

describe("DetailProductPage", () => {
  it("renders main title and price", () => {
    render(<DetailProductPage />);
    expect(
      screen.getByText(/case iphone 16 pro max custom/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Rp 145.000 - Rp 200.000/i)).toBeInTheDocument();
  });

  it("renders material radio options", () => {
    render(<DetailProductPage />);
    expect(screen.getByText(/Premium Softcase/i)).toBeInTheDocument();
    expect(screen.getByText(/Diamond Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Magsafe Diamond Impact X2/i)).toBeInTheDocument();
  });

  it("renders mocked combobox", () => {
    render(<DetailProductPage />);
    expect(screen.getByText(/Mocked Combobox/i)).toBeInTheDocument();
  });

  it("renders checkout buttons", () => {
    render(<DetailProductPage />);
    expect(screen.getByText(/Masukkan Keranjang/i)).toBeInTheDocument();
    expect(screen.getByText(/Beli Sekarang/i)).toBeInTheDocument();
  });
});
