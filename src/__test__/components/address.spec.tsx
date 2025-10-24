/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { Address } from "../../features/address/components/address";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

jest.mock("../api/get-addressById", () => ({
  useGetAddressById: jest.fn(() => ({ data: undefined, isLoading: false })),
}));

jest.mock("../api/create-address", () => ({
  useCreateAddress: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock("../api/update-address", () => ({
  UseUpdateAddress: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock("./province-selector", () => ({
  ProvinceSelector: ({ value, onValueChange }: any) => (
    <input value={value} onChange={(e) => onValueChange(e.target.value)} />
  ),
}));

jest.mock("./regencie-selector", () => ({
  RegencieSelector: ({ value, onValueChange }: any) => (
    <input value={value} onChange={(e) => onValueChange(e.target.value)} />
  ),
}));

jest.mock("./district-selector", () => ({
  DistrictSelector: ({ value, onValueChange }: any) => (
    <input value={value} onChange={(e) => onValueChange(e.target.value)} />
  ),
}));

jest.mock("./village-selector", () => ({
  VillageSelector: ({ value, onValueChange }: any) => (
    <input value={value} onChange={(e) => onValueChange(e.target.value)} />
  ),
}));

describe("Address component", () => {
  it("renders Address form", () => {
    render(<Address />);

    expect(screen.getByPlaceholderText("Nama Lengkap")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("No. Handphone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Kode Pos")).toBeInTheDocument();
  });

  it("calls createAddress on submit", () => {
    const mockMutate = jest.fn();
    const { useCreateAddress } = require("../api/create-address");
    useCreateAddress.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<Address />);
    fireEvent.change(screen.getByPlaceholderText("Nama Lengkap"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("No. Handphone"), {
      target: { value: "081234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Kode Pos"), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByText("Tambah"));
    expect(mockMutate).toHaveBeenCalled();
  });
});
