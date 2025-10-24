import { render, screen } from "@testing-library/react";
import EditAddressPage from "../../app/(customer)/account/address/edit/[id]/page";

// Mock Address component
jest.mock("@/features/address/components/address", () => ({
  Address: ({ addressId }: { addressId: number }) => (
    <div>Mocked Address {addressId}</div>
  ),
}));

// Mock useParams dari next/navigation
jest.mock("next/navigation", () => ({
  useParams: jest.fn(() => ({ id: "42" })),
}));

describe("EditAddressPage", () => {
  it("renders Address component with correct id", () => {
    render(<EditAddressPage />);
    expect(screen.getByText("Mocked Address 42")).toBeInTheDocument();
  });
});
