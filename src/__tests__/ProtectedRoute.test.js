// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import ProtectedRoute from "../security/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// Mock the useAuth hook
jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock Navigate from React Router
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(() => null), // Mock Navigate to prevent actual redirection
}));

describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  // Test 1: RTL Approach - Render, Query, Interact, Assert
  test("renders protected content if user is authenticated", () => {});

  // Test 2: AAA Approach - Arrange, Act, Assert
  test("redirects to login if user is not authenticated", () => {});

  // Test 3: Shows "Loading..." when authentication status is unknown
  test("shows loading state when authentication is still being checked", () => {});
});
