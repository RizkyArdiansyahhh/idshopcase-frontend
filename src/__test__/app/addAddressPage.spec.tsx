import AddressPage from "@/app/(customer)/account/address/page";
import { render } from "@testing-library/react";

import { Address } from "@/features/address/components/address";

describe("Address", () => {
  it("should render", () => {
    const page = render(<Address />);
    expect(page).toMatchSnapshot();
  });
});
