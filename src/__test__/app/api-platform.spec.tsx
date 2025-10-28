import ApiPlatformPage from "@/app/(admin)/admin/(actions)/api-platform/page";
import { render } from "@testing-library/react";

describe("API Platform", () => {
  it("should render", () => {
    const page = render(<ApiPlatformPage />);
    expect(page).toMatchSnapshot();
  });
});
