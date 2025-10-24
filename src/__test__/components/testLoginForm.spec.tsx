/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "@/features/auth/components/login-form";
import { useLogin } from "@/features/auth/api/login";
import { toast } from "sonner";

// Mock hooks & dependencies
jest.mock("../api/login", () => ({
  useLogin: jest.fn(),
  loginSchema: {},
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("LoginForm", () => {
  const mockMutate = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useLogin as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it("renders email and password input fields", () => {
    render(<LoginForm onSuccess={mockOnSuccess} />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<LoginForm onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { hidden: true });

    // default type password
    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
  });

  it("calls mutate (login) when form is submitted", async () => {
    render(<LoginForm onSuccess={mockOnSuccess} />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /masuk/i });

    fireEvent.change(emailInput, { target: { value: "user@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it("shows error toast when login fails", async () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutate: (_: any, { onError }: any) =>
        onError({ response: { data: "Invalid credentials" } }),
      isPending: false,
    });

    render(<LoginForm onSuccess={mockOnSuccess} />);

    const submitButton = screen.getByRole("button", { name: /masuk/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
export { LoginForm };
