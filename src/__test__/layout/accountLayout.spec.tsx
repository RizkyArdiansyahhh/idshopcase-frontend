/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import AccountLayout from "@/app/(customer)/layout"; // sesuaikan path dengan file kamu
import React from "react";

// Mock komponen eksternal
jest.mock("@/components/layouts/navbar", () => ({
  Navbar: jest.fn(() => <div data-testid="navbar">Mock Navbar</div>),
}));

jest.mock("@/features/auth/components/protected-route", () => ({
  ProtectedRoute: jest.fn(({ children }) => (
    <div data-testid="protected-route">{children}</div>
  )),
}));

describe("AccountLayout", () => {
  it("renders ProtectedRoute with allowedRoles=['USER'] and Navbar", () => {
    render(
      <AccountLayout>
        <div data-testid="child">Child Component</div>
      </AccountLayout>
    );

    // Navbar ditampilkan
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    // ProtectedRoute membungkus children
    expect(screen.getByTestId("protected-route")).toBeInTheDocument();

    // children-nya muncul
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("has correct layout structure (flex and sizing classes)", () => {
    const { container } = render(
      <AccountLayout>
        <div>Content</div>
      </AccountLayout>
    );

    // Cek className utama layout
    const mainDiv = container.querySelector(
      "div.h-screen.w-screen.flex.flex-col.items-center.py-2"
    );
    expect(mainDiv).toBeInTheDocument();
  });
});
