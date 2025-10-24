// __tests__/OrdersPage.test.tsx
import { render, screen } from "@testing-library/react";
import OrdersPage from "@/app/(customer)/account/orders/page";

// Mock komponen Orders
jest.mock("@/app/(customer)/orders/_components/orders", () => ({
  Orders: () => <div data-testid="mock-orders">Orders Component</div>,
}));

describe("OrdersPage", () => {
  it("renders Orders component", () => {
    render(<OrdersPage />);
    expect(screen.getByTestId("mock-orders")).toBeInTheDocument();
    expect(screen.getByText("Orders Component")).toBeInTheDocument();
  });
});
