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

  // AAA Approach - Arrange, Act, Assert

  // Test 1: Shows "Loading..." when authentication status is unknown
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
    const loadingContent = screen.getByText(/loading.../i);
    expect(loadingContent).toBeInTheDocument();
  });

  // Test 2
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

  // Test 3: TO-DO
  test("renders protected content if user is authenticated", () => {
    /* User type:
     * user: {
          name: user.name,
        }
     */
    // Arrange: Mock useAuth to return a simulated user
    useAuth.mockReturnValue({
      user: { name: "Jake" }, // Simulated logged-in user
      isLoggingIn: false,
    });

    // Act: Render the ProtectedRoute component within a MemoryRouter
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Protected Content</h1> {/* Content inside protected route */}
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Assert: The protected content should be visible
    const protectedElement = screen.getByText(/protected content/i); // Find protected content
    expect(protectedElement).toBeInTheDocument();
  });
});
