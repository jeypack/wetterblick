import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AddCityDialog from "./AddCityDialog";

vi.mock("../../hooks/useOverlay", () => ({
  useOverlay: () => ({
    setToastMessage: vi.fn(),
  }),
}));

vi.mock("../../hooks/useWeather", () => ({
  useWeather: () => ({
    model: "knmi_seamless",
    searchLocations: vi.fn(),
  }),
}));

vi.mock("./CitySearch", () => ({
  default: ({ onSubmit }) => (
    <button
      type="button"
      onClick={() =>
        onSubmit({
          id: "berlin",
          name: "Berlin",
          country: "DE",
          latitude: 52.52,
          longitude: 13.405,
        })
      }
    >
      City auswählen
    </button>
  ),
}));

vi.mock("../FavoriteForm", () => ({
  default: ({ onConfirm, btnLabels }) => (
    <button type="button" onClick={() => onConfirm({ title: "Mein Titel", note: "Meine Notiz" })}>
      {btnLabels.confirm}
    </button>
  ),
}));

describe("AddCityDialog", () => {
  test("shows an error below CitySearch when no city was selected via CitySearch", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <AddCityDialog
        data={{ title: "Ort hinzufügen", description: "Beschreibung", formtitle: "Titel" }}
        isOpen={true}
        setIsOpen={vi.fn()}
        onConfirm={onConfirm}
      />
    );

    await user.click(screen.getByRole("button", { name: "Hinzufügen" }));

    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByText("Bitte wähle zuerst eine Stadt aus.")).toBeInTheDocument();
  });

  test("calls onConfirm with selected city when a city was chosen", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <AddCityDialog
        data={{ title: "Ort hinzufügen", description: "Beschreibung", formtitle: "Titel" }}
        isOpen={true}
        setIsOpen={vi.fn()}
        onConfirm={onConfirm}
      />
    );

    await user.click(screen.getByRole("button", { name: "City auswählen" }));
    await user.click(screen.getByRole("button", { name: "Hinzufügen" }));

    expect(onConfirm).toHaveBeenCalledWith({
      id: "52.52-13.405",
      title: "Mein Titel",
      note: "Meine Notiz",
      location: {
        id: "berlin",
        name: "Berlin",
        country: "DE",
        latitude: 52.52,
        longitude: 13.405,
      },
    });
  });
});
