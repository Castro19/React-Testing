import HomePage from "../pages/home/HomePage";
import { fireEvent, render } from "@testing-library/react";

describe("HomePage Component", () => {
  test("renders homepage title and login button", async () => {
    // 1. Render: We are rendering our component into our test env
    render(<HomePage />);

    // 2. Query:
    const titleElement = screen.getByText(/homepage/i); // Find the element with text "homepage"
    const buttonElement = screen.getByText(/login/i); // Find the element with text "login"

    // 3. Interact
    fireEvent.click(buttonElement); // Simulate a click on the element

    // 4. Assert
    expect(titleElement).toBeInTheDocument(); // Ensure the element is present
    expect(buttonElement).toBeInTheDocument(); // Ensure the element is present
  });
});
