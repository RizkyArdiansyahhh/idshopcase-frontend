// src/features/auth/components/__tests__/login-form.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "../../features/auth/components/login-form";

describe("LoginForm", () => {
  it("renders email, password inputs and submit button", () => {
    const onSuccess = jest.fn();
    render(<LoginForm onSuccess={onSuccess} />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows user to type in email and password", () => {
    const onSuccess = jest.fn();
    render(<LoginForm onSuccess={onSuccess} />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("123456");
  });

  it("calls onSuccess when form is submitted", () => {
    const onSuccess = jest.fn();
    render(<LoginForm onSuccess={onSuccess} />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    fireEvent.click(submitButton);

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
