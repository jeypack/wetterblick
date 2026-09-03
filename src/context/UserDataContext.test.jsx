import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import UserDataProvider, { UserDataContext } from "./UserDataContext";

const { mockSaveFavorites, mockSaveRecentLocations, mockGetUserData, mockUser } = vi.hoisted(() => ({
  mockSaveFavorites: vi.fn(() => Promise.resolve()),
  mockSaveRecentLocations: vi.fn(() => Promise.resolve()),
  mockGetUserData: vi.fn(() => Promise.resolve({ recentLocations: [], favorites: [] })),
  mockUser: { uid: "user-123" },
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: mockUser,
  }),
}));

vi.mock("../firebase/user.repo", () => ({
  getUserData: mockGetUserData,
  saveFavorites: mockSaveFavorites,
  saveRecentLocations: mockSaveRecentLocations,
}));

function TestConsumer() {
  const { favorites, updateFavorites, deleteFavorite } = React.useContext(UserDataContext);

  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.title}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          updateFavorites({
            id: "city-1",
            location: { id: "city-1", latitude: 52.52, longitude: 13.41, name: "Berlin" },
            title: "Berlin",
            note: "Erstnotiz",
          })
        }
      >
        add
      </button>
      <button
        type="button"
        onClick={() =>
          updateFavorites({
            id: "city-1",
            location: { id: "city-1", latitude: 52.52, longitude: 13.41, name: "Berlin" },
            title: "Berlin neu",
            note: "Aktualisierte Notiz",
          })
        }
      >
        update
      </button>
      <button type="button" onClick={() => deleteFavorite("city-1")}>
        remove
      </button>
    </div>
  );
}

describe("UserDataContext favorites", () => {
  test("upserts a favorite and deletes it explicitly", async () => {
    const user = userEvent.setup();

    render(
      <UserDataProvider>
        <TestConsumer />
      </UserDataProvider>,
    );

    await waitFor(() => expect(screen.getByTestId("count")).toHaveTextContent("0"));

    await user.click(screen.getByRole("button", { name: "add" }));
    await waitFor(() => expect(screen.getByTestId("count")).toHaveTextContent("1"));
    expect(screen.getByText("Berlin")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "update" }));
    await waitFor(() => expect(screen.getByText("Berlin neu")).toBeInTheDocument());
    expect(screen.queryByText("Berlin")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "remove" }));
    await waitFor(() => expect(screen.getByTestId("count")).toHaveTextContent("0"));
    expect(mockSaveFavorites).toHaveBeenCalledWith("user-123", []);
  });
});
