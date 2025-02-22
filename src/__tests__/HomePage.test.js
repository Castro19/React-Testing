/* eslint-disable no-unused-vars */
import { render, screen } from "@testing-library/react";
import React from "react"; // Add this at the top

import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ReactRouter from "react-router-dom";

test("demo test", () => {
  render(<div data-testid="test">Hello</div>);
  expect(screen.getByTestId("test")).toBeInTheDocument();
});

// // Mock the useNavigate hook
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => jest.fn(),
// }));

// describe("HomePage Component", () => {
//   test("renders homepage title and login button", () => {
//     // TODO: Render the component within a MemoryRouter
//     // TODO: Use screen queries to find elements
//     // const titleElement = ...
//     // const buttonElement = ...
//     // TODO: Add assertions for element presence
//   });

//   test("navigates to the login page when Login button is clicked", async () => {
//     const mockNavigate = jest.fn();
//     jest
//       .spyOn(ReactRouter, "useNavigate")
//       .mockImplementation(() => mockNavigate);

//     // TODO: Render the component

//     // TODO: Find the login button

//     // TODO: Simulate user click

//     // TODO: Assert navigation was called with correct path
//   });
// });
