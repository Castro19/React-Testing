/*
 * This function simulates user authentication by checking credentials against a fake database.
 * This fake database is stored in the `public/fakeDB.json` file.
 */
export const fakeAuth = async (email, password) => {
  // Fetch the JSON file that acts as a fake database.
  const response = await fetch("/fakeDB.json");
  const data = await response.json();

  // Find a user in the fake database that matches the provided email and password.
  const user = data.users.find(
    (u) => u.email === email && u.password === password
  );

  // Return an object indicating success and user details if a match is found,
  // otherwise return an error message indicating invalid credentials.
  return user
    ? {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }
    : { success: false, error: "Invalid credentials" };
};
