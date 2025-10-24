// __tests__/auth.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import LoginPage from "@/app/(auth)/login/page";
import RegisterPage from "@/app/(auth)/register/page";

// Mock fetch/axios untuk login/register
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "fake-token" }),
  } as Response)
) as jest.Mock;

describe("Login Page", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty fields", async () => {
    render(<LoginPage />);
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("allows user to type email and password", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "123456");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("123456");
  });

  it("calls API when form is submitted", async () => {
    render(<LoginPage />);

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "test@example.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), "123456");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "/api/login", // sesuaikan endpoint di aplikasi
        expect.objectContaining({
          method: "POST",
          body: expect.any(String),
          headers: expect.any(Object),
        })
      );
    });
  });
});

describe("Register Page", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders register form", () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty fields", async () => {
    render(<RegisterPage />);
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("calls API when form is submitted", async () => {
    render(<RegisterPage />);

    await userEvent.type(screen.getByPlaceholderText(/name/i), "Test User");
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "test@example.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), "123456");
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "/api/register", // sesuaikan endpoint di aplikasi
        expect.objectContaining({
          method: "POST",
          body: expect.any(String),
          headers: expect.any(Object),
        })
      );
    });
  });
});
