export const fakeAuth = async (email, password) => {
  const response = await fetch("/fakeDB.json"); // Fetch the JSON file
  const data = await response.json();

  const user = data.users.find(
    (u) => u.email === email && u.password === password
  );

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
