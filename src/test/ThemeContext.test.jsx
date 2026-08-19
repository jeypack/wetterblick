import React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ThemeProvider, ThemeContext} from "../context/ThemeContext";

describe("ThemeContext component", () => {
  test("renders without crashing", () => {
    // Render the ThemeContext component and check if it renders without errors
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({theme}) => <div data-testid="theme-mode">{theme.mode}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );
  });

  test("initial theme mode is dark", () => {
    // Render the ThemeContext component and check the initial theme mode
    const {getByTestId} = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({theme}) => <div data-testid="theme-mode">{theme.mode}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );
    const themeMode = getByTestId("theme-mode");
    expect(themeMode.textContent).toBe("dark");
  });

  test("updateTheme function works", async () => {
    const user = userEvent.setup();
    // Render the ThemeContext component, update the theme, and check if the theme mode changes
    const {getByTestId} = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({theme, updateTheme}) => (
            <>
              <div data-testid="theme-mode">{theme.mode}</div>
              <button
                data-testid="update-theme-button"
                onClick={() => updateTheme({mode: "light"})}
              >
                Update Theme
              </button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );
    const themeMode = getByTestId("theme-mode");
    expect(themeMode.textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    const updateButton = getByTestId("update-theme-button");
    await user.click(updateButton);
    expect(themeMode.textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
