import Header from "../components/Header";
import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import AuthProvider from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

/**
 * Integration tests for the Header component, which includes navigation links and user authentication.
 * The tests cover rendering, navigation, and user interaction with the header.
 */
describe("Header component", () => {
  test("renders the header", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  test("clicking the logo navigates to the home page", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    const homeLink = screen.getByText("Home");
    await user.click(homeLink);
    expect(window.location.pathname).toBe("/");
  });



});
