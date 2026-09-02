import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import CitySearch from "./CitySearch";

describe("CitySearch component", () => {
  test("renders combobox and submit button", () => {
    render(<CitySearch model="gfs" onSubmit={vi.fn()} searchLocations={vi.fn()} />);

    const inputElement = screen.getByRole("combobox");
    const buttonElement = screen.getByRole("button", {name: /Wetter anzeigen/i});

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onSubmit with the selected location and model", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const searchLocations = vi.fn().mockResolvedValue([
      {
        id: "berlin",
        name: "Berlin",
        country: "DE",
        latitude: 52.52,
        longitude: 13.405,
      },
    ]);

    render(
      <CitySearch model="ecmwf_ifs" onSubmit={onSubmit} searchLocations={searchLocations} />,
    );

    const inputElement = screen.getByRole("combobox");
    await user.type(inputElement, "Berlin");

    const option = await screen.findByRole("option", {name: /Berlin/i});
    await user.click(option);

    const buttonElement = screen.getByRole("button", {name: /Wetter anzeigen/i});
    expect(buttonElement).not.toBeDisabled();
    await user.click(buttonElement);

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({id: "berlin", name: "Berlin"}),
      "ecmwf_ifs",
    );
  });
});
