/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProfileForm } from "@/features/profile/components/profile-form";
import ProfilePage from "@/app/(customer)/account/profile/page";
import * as api from "@/features/auth/api/get-user";

// Mock useGetUser hook
jest.mock("@/features/auth/api/get-user", () => ({
  useGetUser: jest.fn(),
}));

describe("ProfilePage & ProfileForm", () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    phone: "081234567890",
    last_name: "Doe",
  };

  beforeEach(() => {
    (api.useGetUser as jest.Mock).mockReturnValue({
      data: mockUser,
    });
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "1"),
      },
      writable: true,
    });
  });

  it("renders user profile correctly", () => {
    render(<ProfilePage />);
    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.phone)).toBeInTheDocument();
  });

  it("can switch to edit mode", () => {
    render(<ProfileForm id={0} {...mockUser} />);
    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue(mockUser.name) as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  it("shows save button when editing", () => {
    render(<ProfileForm id={0} {...mockUser} />);
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});

// Mock localStorage
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => "1"),
  },
  writable: true,
});
