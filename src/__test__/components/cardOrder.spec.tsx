// __tests__/card-order.test.tsx
import { render, screen } from "@testing-library/react";
import { CardOrder } from "@/app/(customer)/account/orders/_components/card-order";
import * as productHook from "@/features/products/api/get-productById";

// Mock useGetProduct
jest.mock("@/features/product/api/get-product");

describe("CardOrder Component", () => {
  const mockProduct = {
    name: "iPhone 16 Pro Max",
    phone_type: "Diamond Impact",
  };

  beforeEach(() => {
    (productHook.useGetProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });
  });

  it("renders product name and phone_type", () => {
    render(<CardOrder id={1} price={120000} status="pending" />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.phone_type)).toBeInTheDocument();
  });

  it("renders price formatted in IDR", () => {
    render(<CardOrder id={1} price={120000} status="pending" />);
    expect(screen.getByText("Rp 120.000")).toBeInTheDocument();
  });

  it("renders status and correct icon", () => {
    const { rerender } = render(
      <CardOrder id={1} price={120000} status="pending" />
    );
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByTestId("credit-card-icon")).toBeInTheDocument();

    rerender(<CardOrder id={1} price={120000} status="shipped" />);
    expect(screen.getByText("shipped")).toBeInTheDocument();
    expect(screen.getByTestId("truck-icon")).toBeInTheDocument();

    rerender(<CardOrder id={1} price={120000} status="completed" />);
    expect(screen.getByText("completed")).toBeInTheDocument();
    expect(screen.getByTestId("package-check-icon")).toBeInTheDocument();
  });
});
