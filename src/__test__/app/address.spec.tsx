import AddressPage from "@/app/(customer)/account/address/page";
import { render } from "@testing-library/react";

describe("Address", () => {
  it("should render", () => {
    const page = render(<AddressPage />);
    expect(page).toMatchSnapshot();
  });
});
