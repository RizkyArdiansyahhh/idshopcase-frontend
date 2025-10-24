// __tests__/AddAddressPage.test.tsx
import { render, screen } from "@testing-library/react";
import AddAddressPage from "@/app/(customer)/account/address/page";

// Mock komponen Address
jest.mock("@/features/address/components/address", () => ({
  Address: () => <div data-testid="mock-address">Address Component</div>,
}));

describe("AddAddressPage", () => {
  it("renders Address component", () => {
    render(<AddAddressPage />);
    expect(screen.getByTestId("mock-address")).toBeInTheDocument();
    expect(screen.getByText("Address Component")).toBeInTheDocument();
  });
});
