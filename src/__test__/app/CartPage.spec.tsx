// __tests__/CartPage.test.tsx
import { render, screen } from "@testing-library/react";
import CartPage from "@/app/(customer)/cart/page";

// Mock komponen Cart agar test fokus ke CartPage
jest.mock("@/app/(customer)/cart/_components/cart", () => ({
  Cart: () => <div data-testid="mock-cart">Cart Component</div>,
}));

describe("CartPage", () => {
  it("renders Cart component", () => {
    render(<CartPage />);
    expect(screen.getByTestId("mock-cart")).toBeInTheDocument();
    expect(screen.getByText("Cart Component")).toBeInTheDocument();
  });
});
