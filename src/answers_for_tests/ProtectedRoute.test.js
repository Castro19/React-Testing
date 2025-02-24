import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../security/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

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
  test("renders protected content if user is authenticated", () => {
    // Arrange: Mock useAuth to return an authenticated user
    useAuth.mockReturnValue({
      user: { name: "Test User" }, // Simulate logged-in user
      isLoggingIn: false,
    });

    // Render ProtectedRoute with a test element inside
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Protected Content</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Query: Find the protected content
    const protectedContent = screen.getByText(/protected content/i);

    // Assert: The protected content should be visible
    expect(protectedContent).toBeInTheDocument();
  });

  // Test 2: AAA Approach - Arrange, Act, Assert
  test("redirects to login if user is not authenticated", () => {
    // Arrange: Mock useAuth to return no user
    useAuth.mockReturnValue({
      user: null, // Simulate unauthenticated state
      isLoggingIn: false,
    });

    // Act: Render the ProtectedRoute component
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Protected Content</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Assert: Ensure Navigate was called with the correct redirection
    expect(Navigate).toHaveBeenCalledWith({ to: "/login", replace: true }, {});
  });

  // Test 3: Shows "Loading..." when authentication status is unknown
  test("shows loading state when authentication is still being checked", () => {
    // Arrange: Mock useAuth with an undefined user (still loading)
    useAuth.mockReturnValue({
      user: undefined,
      isLoggingIn: true,
    });

    // Act: Render the ProtectedRoute component
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Protected Content</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Assert: Check if the loading message is displayed
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
