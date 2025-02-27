import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "../pages/home/HomePage";
import { MemoryRouter } from "react-router-dom";

// TO-DO
describe("HomePage Component", () => {
  test("renders homepage title and login button", () => {
    // 1. Render the HomePage component (Place inside a MemoryRouter)
    /* Why memory router?
     * Answer: Because we want to test the HomePage component in isolation And since we're using useNavigate, which can only only works inside a React Router provider, we need to wrap HomePage in a router during testing
     */
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // 2. Query the DOM for the element with text "homepage"
    const titleElement = screen.getByText("HomePage");
    // 2. Query the DOM for the element with text "login"
    const buttonElement = screen.getByText(/login/i);

    // 3. Interact
    // Interact by clicking the buttonElement element
    fireEvent.click(buttonElement);

    // 4. assert
    // Check if the titleElement element is in the document
    expect(titleElement).toBeInTheDocument();
    // Check if the buttonElement element is in the document
    expect(buttonElement).toBeInTheDocument();
  });
  // TO-DO:
  test("navigates to the login page when Login button is clicked", async () => {});
});
