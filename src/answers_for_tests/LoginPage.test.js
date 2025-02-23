import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";

// Mock the useNavigate hook from React Router
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock the useAuth hook from AuthContext
const mockLogin = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false, // Start as unauthenticated
  }),
}));

describe("LoginPage Component", () => {
  test("renders email & password inputs and login button", () => {
    // Arrange: Render the LoginPage inside MemoryRouter
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Act: Find input fields and the login button
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Assert: Ensure elements are in the document
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  test("shows an error message when login fails", async () => {
    // Arrange:
    mockLogin.mockResolvedValueOnce({
      success: false,
      error: "Invalid credentials",
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Act:
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "wrongpassword");
    await userEvent.click(loginButton);

    // Assert:
    const errorMessage = await screen.findByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("navigates to the dashboard on successful login", async () => {
    // Arrange:
    mockLogin.mockResolvedValueOnce({ success: true }); // Simulate successful login

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Act:
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "correctpassword");
    await userEvent.click(loginButton);

    // Assert:
    expect(mockLogin).toHaveBeenCalledWith(
      "test@example.com",
      "correctpassword"
    );
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/dashboard");
  });
});
