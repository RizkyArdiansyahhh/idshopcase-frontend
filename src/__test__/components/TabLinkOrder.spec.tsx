/* eslint-disable react/no-children-prop */
// __tests__/TabLinkOrder.test.tsx
import { render, screen } from "@testing-library/react";
import { TabLinkOrder } from "../../app/(customer)/account/orders/_components/tab-link-order";

describe("TabLinkOrder", () => {
  it("renders children correctly", () => {
    render(<TabLinkOrder href="/orders" children="All Orders" />);
    expect(screen.getByText("All Orders")).toBeInTheDocument();
  });

  it("renders count if provided", () => {
    render(<TabLinkOrder href="/orders" children="Pending" count={5} />);
    expect(screen.getByText("Pending(5)")).toBeInTheDocument();
  });

  it("applies active class when isActive is true", () => {
    const { container } = render(
      <TabLinkOrder href="/orders" children="Active" isActive />
    );
    expect(container.firstChild).toHaveClass(
      "rounded-sm text-background bg-foreground/70"
    );
  });

  it("renders href correctly", () => {
    render(<TabLinkOrder href="/orders/1" children="Order 1" />);
    expect(screen.getByText("Order 1").closest("a")).toHaveAttribute(
      "href",
      "/orders/1"
    );
  });
});
