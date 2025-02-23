import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";

// Mock the useNavigate hook from React Router
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("HomePage Component", () => {
  test("renders homepage title and login button", () => {
    // Arrange: Render the HomePage component inside a MemoryRouter
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Act: Find the title and login button in the DOM
    const titleElement = screen.getByRole("heading", { name: /homepage/i }); // Looking for an h1/h2/h3 element with "HomePage"
    const buttonElement = screen.getByRole("button", { name: /login/i }); // Looking for a button labeled "Login"

    // ✅ Assert: Check if the elements are in the document
    expect(titleElement).toBeInTheDocument(); // Ensure the title is present
    expect(buttonElement).toBeInTheDocument(); // Ensure the button is present
  });

  test("navigates to the login page when Login button is clicked", async () => {
    // Arrange:
    // Step 1: Render the HomePage inside a MemoryRouter
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Act:
    // Step 2: Find the login button in the DOM
    const buttonElement = screen.getByRole("button", { name: /login/i });

    // Step 3: Simulate a user clicking the login button
    await userEvent.click(buttonElement);

    // Assert:
    // Step 4: Check if navigate was called with the correct path
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
  });
});
