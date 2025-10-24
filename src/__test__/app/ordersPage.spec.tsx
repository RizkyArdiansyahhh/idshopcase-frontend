import { render, screen } from "@testing-library/react";
import OrdersPage from "@/app/(customer)/account/orders/page";

// Mock Orders component
jest.mock("./_components/orders", () => ({
  Orders: () => <div data-testid="orders-component">Orders Component</div>,
}));

describe("OrdersPage", () => {
  it("renders Orders component", () => {
    render(<OrdersPage />);
    expect(screen.getByTestId("orders-component")).toBeInTheDocument();
  });
});
