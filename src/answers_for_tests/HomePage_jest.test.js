import { userEvent, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";

/* Mock the useNavigate hook from React Router
 *  Why mock the useNavigate hook?
 *  Context: useNavigate is a function from React Router that allows components to navigate to different pages
 *  Answer: In a test environment, there is no actual browser to handle navigation. If we don’t mock useNavigate, our test might crash with an error.
 */

const mockedUsedNavigate = jest.fn(); // Create a mock function for useNavigate

/* 
- What is this code below doing? It's ok to be confused at first glance.
    * Answer: This code is mocking the useNavigate hook from React Router.

- What is the purpose of the jest.mock function?
    * Answer: The jest.mock function is used to mock the react-router-dom module.

- What is the purpose of the jest.requireActual function?
    * Answer: The jest.requireActual function is used to import the actual react-router-dom module.

- useNavigate: () => mockedUsedNavigate
    * Answer: In our test environment, we want to use the mockedUsedNavigate function when useNavigate is called.

- In conclusion: We are importing the actual library (react-router-dom) and then overriding the specific function (useNavigate) to use our mocked function (mockedUsedNavigate)
*/

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("HomePage Component", () => {
  test("renders homepage title and login button", () => {
    // 1. Render the HomePage component (Place inside a MemoryRouter)
    /* Why memory router?
     * Answer: Because we want to test the HomePage component in isolation And since we're using useNavigate, which can only only works inside a React Router provider, we need to wrap HomePage in a router during testing
     */
    render(
      // <MemoryRouter>
      <HomePage />
      // </MemoryRouter>
    );

    // 2. Query the DOM
    // Find the title and login button in the DOM using getByText
    const titleElement = screen.getByText(/homepage/i); // Find the element with text "HomePage"
    const buttonElement = screen.getByText(/login/i); // Find the button with text "Login"

    // 3. Interact with the DOM (Simulate a user clicking the login button)
    fireEvent.click(buttonElement);

    // 4. Assert: Check if the elements are in the document
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
