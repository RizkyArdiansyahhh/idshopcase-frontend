import { render, screen } from "@testing-library/react";
import { Orders } from "@/app/(customer)/account/orders/_components/orders";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/features/orders/components/orders-list", () => ({
  OrdersList: ({ status }: { status: string }) => (
    <div data-testid="orders-list">{status}</div>
  ),
}));

describe("Orders Component", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { usePathname, useSearchParams } = require("next/navigation");

  beforeEach(() => {
    usePathname.mockReturnValue("/account/orders");
  });

  it("renders tabs and OrdersList with default status pending", () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    render(<Orders />);

    expect(screen.getByText("Belum Dibayar")).toBeInTheDocument();
    expect(screen.getByText("Dikirim")).toBeInTheDocument();
    expect(screen.getByText("Selesai")).toBeInTheDocument();

    expect(screen.getByTestId("orders-list")).toHaveTextContent("pending");
  });

  it("renders OrdersList with status shipped", () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue("shipped"),
    });

    render(<Orders />);
    expect(screen.getByTestId("orders-list")).toHaveTextContent("shipped");
  });

  it("renders OrdersList with status completed", () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue("completed"),
    });

    render(<Orders />);
    expect(screen.getByTestId("orders-list")).toHaveTextContent("completed");
  });
});
