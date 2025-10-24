import { render, screen } from "@testing-library/react";
import OrdersPage from "@/app/(customer)/account/orders/page";
import { Orders } from "@/app/(customer)/account/orders/_components/orders";

jest.mock("@/app/(customer)/account/orders/_components/orders", () => ({
  Orders: jest.fn(() => <div>Mocked Orders Component</div>),
}));

describe("OrdersPage", () => {
  it("renders Orders component", () => {
    render(<OrdersPage />);
    expect(screen.getByText("Mocked Orders Component")).toBeInTheDocument();
  });
});
