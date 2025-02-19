# React Application Documentation

In this Github Repo, we will showcase a simple React app that implements a complete authentication flow using React Context API. We will also showcase how to test the application using Jest and React Testing Library.

## Tech Stack & Tools

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Context API](https://react.dev/reference/react/createContext) - Global state management
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utility
- [Jest](https://jestjs.io/) - Testing framework
- [CSS Modules](https://github.com/css-modules/css-modules) - Scoped styling

## Key Features

### Authentication & Authorization

We will not be using any backend API for this example. Instead, we will be using a fake database that is stored in the `src/fakeDB.json` file. However, the authentication flow is implemented as if it were a real backend API.

Thanks to the context API, the authentication state is managed globally and persisted across page refreshes.

Key files:

- `src/context/AuthContext.jsx` - Global auth state management
- `src/auth/auth.js` - Authentication utility functions
- `src/security/ProtectedRoute.jsx` - Route protection component

### Routing

The application uses React Router v6 for navigation and route protection:

- `src/App.jsx` - Main application component with routing setup
- `src/pages/HomePage.jsx` - Landing page with login button
- `src/pages/LoginPage.jsx` - Login form with validation
- `src/pages/Dashboard.jsx` - Protected dashboard page

### Testing

The application includes unit tests using Jest and React Testing Library:

- `src/__tests__/...`
