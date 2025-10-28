import OrdersPage from "@/app/(admin)/admin/(actions)/orders/page";
import { render } from "@testing-library/react";

describe("Orders", () => {
  it("should render", () => {
    const page = render(<OrdersPage />);
    expect(page).toMatchSnapshot();
  });
});
