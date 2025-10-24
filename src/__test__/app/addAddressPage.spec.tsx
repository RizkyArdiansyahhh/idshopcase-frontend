import { render, screen } from "@testing-library/react";
import AddAddressPage from "../../app/(customer)/account/address/new/page";

// Mock Address component
jest.mock("@/features/address/components/address", () => ({
  Address: () => <div>Mocked Address</div>,
}));

describe("AddAddressPage", () => {
  it("renders Address component", () => {
    render(<AddAddressPage />);
    expect(screen.getByText("Mocked Address")).toBeInTheDocument();
  });
});
