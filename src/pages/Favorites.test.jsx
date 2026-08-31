import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Favorites from "./Favorites";
import { vi } from "vitest";

const sampleFavorite = {
  id: "berlin-52.52-13.41",
  time: "2026-08-31T12:00:00",
  temperature: 22.4,
  relativeHumidity: 58,
  windSpeed: 12,
  windDirection: 90,
  weatherCode: 1,
  location: { id: 1, name: "Berlin", country: "Deutschland", latitude: 52.52, longitude: 13.41 },
  model: { name: "KNMI Forecast" },
};

vi.mock("../hooks/useWeather", () => ({
  useWeather: () => ({
    favoriteList: [sampleFavorite],
  }),
}));

vi.mock("../hooks/useUserData", () => ({
  useUserData: () => ({
    updateFavorites: vi.fn(),
  }),
}));

describe("Favorites page", () => {
  test("shows the comparison panel after selecting a city for compare mode", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /Orte vergleichen/i }));
    await user.click(screen.getByRole("switch"));

    expect(screen.getByRole("button", { name: /Temperatur/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Berlin/i).length).toBeGreaterThan(0);
  });
});
