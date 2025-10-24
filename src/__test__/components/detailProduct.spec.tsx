/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import DetailProductPage from "../../app/(customer)/products/detail/[id]/page";

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock Combobox
jest.mock("@/app/(customer)/products/detail/components/combo-box", () => ({
  Combobox: () => <div>Mocked Combobox</div>,
}));

// Mock FormCheckout
jest.mock("@/features/checkout/components/form-checkout", () => ({
  FormCheckout: ({ children }: any) => <button>{children}</button>,
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ShoppingCart: () => <span>ShoppingCartIcon</span>,
  Upload: () => <span>UploadIcon</span>,
}));

describe("DetailProductPage", () => {
  it("renders main headings and product info", () => {
    render(<DetailProductPage />);
    expect(
      screen.getByText(/case iphone 16 pro max custom/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Rp 145.000 - Rp 200.000/i)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor/i)).toBeInTheDocument();
  });

  it("renders all material options", () => {
    render(<DetailProductPage />);
    expect(screen.getByText(/Premium Softcase/i)).toBeInTheDocument();
    expect(screen.getByText(/Diamond Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Magsafe Diamond Impact X2/i)).toBeInTheDocument();
  });

  it("renders mocked Combobox and buttons", () => {
    render(<DetailProductPage />);
    expect(screen.getByText(/Mocked Combobox/i)).toBeInTheDocument();
    expect(screen.getByText(/Masukkan Keranjang/i)).toBeInTheDocument();
    expect(screen.getByText(/Beli Sekarang/i)).toBeInTheDocument();
  });
});
