import ProductsPage from "@/app/(admin)/admin/(actions)/products/page";
import { render } from "@testing-library/react";

describe("Products", () => {
  it("should render", () => {
    const page = render(<ProductsPage />);
    expect(page).toMatchSnapshot();
  });
});
