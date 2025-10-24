import { render, screen } from "@testing-library/react";
import { InputCardProfile } from "../../app/(customer)/account/profile/_components/input-card-profile";

describe("InputCardProfile", () => {
  it("renders label and input correctly", () => {
    render(
      <InputCardProfile label="Nama" value="Dzakwa" type="text" id="name" />
    );

    // Label muncul
    expect(screen.getByText("Nama")).toBeInTheDocument();

    // Input muncul dengan value yang sesuai
    const input = screen.getByDisplayValue("Dzakwa") as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Input disabled
    expect(input.disabled).toBe(true);

    // Tipe input sesuai
    expect(input.type).toBe("text");
  });
});
