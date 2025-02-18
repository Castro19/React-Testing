export const fakeAuth = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        resolve({ success: true, user: { email } });
      } else {
        resolve({ success: false, error: "Invalid credentials" });
      }
    }, 500); // Simulate network delay
  });
};
