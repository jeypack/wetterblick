import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import CitySearch from "./CitySearch";

describe("CitySearch component", () => {
  test("renders input field and button", () => {
    render(<CitySearch getCity={vi.fn()} model="gfs" />);
    const inputElement = screen.getByPlaceholderText(/Suche Standort.../i);
    inputElement.scrollIntoView = vi.fn(); // Mock scrollIntoView to avoid errors in test environment
    const buttonElement = screen.getByRole("button", {name: /Wetter suchen/i});
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls getCity with correct parameters on form submission", async () => {
    const user = userEvent.setup();
    const getCity = vi.fn();
    render(<CitySearch getCity={getCity} model="ecmwf_ifs" />);
    const inputElement = screen.getByPlaceholderText(/Suche Standort.../i);
    inputElement.scrollIntoView = vi.fn(); // Mock scrollIntoView to avoid errors in test environment
    const buttonElement = screen.getByRole("button", {name: /Wetter suchen/i});

    await user.type(inputElement, "Berlin");
    await user.click(buttonElement);

    expect(getCity).toHaveBeenCalledWith("Berlin", "ecmwf_ifs");
  });
});
