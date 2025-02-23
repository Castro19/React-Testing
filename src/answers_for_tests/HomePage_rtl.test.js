import { fireEvent, render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";

describe("HomePage Component", () => {
  test("renders homepage title and login button", async () => {
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
});

/* Let this test fail
 *
 * 1. Look at the error and locate the message:
 *    ❌ "useNavigate() may be used only in the context of a <Router> component."
 *
 * 2. Understand the error:
 *    ✅ React components rely on external dependencies like the router (useNavigate), API calls (fetch), or even browser functions like setTimeout().
 *    ❌ In a test environment, we are intentionally isolating our component from these external dependencies, so these real functions might not work the same way they do in our main app.
 *
 * 3. Fix the error:
 *    - This is where Mocking comes in! Since we are testing **independently** from our app, we need to replace real functions with test-friendly versions.
 *    - `MemoryRouter` mimics React Router, providing the necessary context so our component can work properly in a test.
 *
 * 4. Run the test again.
 *
 * 5. See that the test passes. ✅
 *
 * 6. Go back to the slides to explain Jest and React Testing Library:
 *    - What is Jest? (Testing framework)
 *    - What is Mocking? (Replacing real functions with fake ones)
 *    - How React Testing Library helps us test like a user
 */
