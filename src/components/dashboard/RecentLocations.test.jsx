import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import RecentLocations from "./RecentLocations";

vi.mock("./CityCard", () => ({
  default: ({ weather, onSelect }) => (
    <button type="button" onClick={() => onSelect?.(weather.location)}>
      {weather.location.name}
    </button>
  ),
}));

describe("RecentLocations component", () => {
  test("moves by one item at a time with previous and next buttons", async () => {
    const user = userEvent.setup();
    const recentList = Array.from({ length: 12 }, (_, index) => ({
      id: `city-${index}`,
      time: "2026-08-31T12:00:00.000Z",
      location: { name: `City ${index + 1}` },
    }));

    render(<RecentLocations recentList={recentList} onUpdate={vi.fn()} pageSize={8} />);

    expect(screen.getByText("City 1")).toBeInTheDocument();
    expect(screen.getByText("City 8")).toBeInTheDocument();
    expect(screen.queryByText("City 9")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Weiter/i }));

    expect(screen.queryByText("City 1")).not.toBeInTheDocument();
    expect(screen.getByText("City 2")).toBeInTheDocument();
    expect(screen.getByText("City 9")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Zurück/i }));

    expect(screen.getByText("City 1")).toBeInTheDocument();
    expect(screen.getByText("City 8")).toBeInTheDocument();
  });

  test("resets the carousel to the first page when a city card is selected", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    const recentList = Array.from({ length: 12 }, (_, index) => ({
      id: `city-${index}`,
      time: "2026-08-31T12:00:00.000Z",
      location: { name: `City ${index + 1}` },
    }));

    render(<RecentLocations recentList={recentList} onUpdate={onUpdate} pageSize={8} />);

    await user.click(screen.getByRole("button", { name: /Weiter/i }));
    expect(screen.getByRole("button", { name: "City 9" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "City 9" }));

    expect(onUpdate).toHaveBeenCalledWith({ name: "City 9" });
    expect(screen.getByRole("button", { name: "City 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "City 8" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "City 9" })).not.toBeInTheDocument();
  });
});
