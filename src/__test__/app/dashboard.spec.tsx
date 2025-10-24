import DashboardPage from "@/app/(admin)/admin/dashboard/page";
import { render } from "@testing-library/react";

describe("Dasboard", () => {
  it("should render", () => {
    const page = render(<DashboardPage />);
    expect(page).toMatchSnapshot();
  });
});
