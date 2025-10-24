import UsersPage from "@/app/(admin)/admin/users/page";
import { render } from "@testing-library/react";

describe("Users", () => {
  it("should render", () => {
    const page = render(<UsersPage />);
    expect(page).toMatchSnapshot();
  });
});
