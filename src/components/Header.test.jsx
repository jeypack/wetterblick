import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: null }),
}));

vi.mock("../hooks/useWeather", () => ({
  useWeather: () => ({
    favoriteList: [{ id: "fav-1", location: { name: "Berlin" } }],
    recentList: [{ id: "recent-1", location: { name: "Hamburg" } }],
  }),
}));

vi.mock("../hooks/useOverlay", () => ({
  useOverlay: () => ({ setToastMessage: vi.fn() }),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("./ThemeMenu", () => ({
  default: () => <div>ThemeMenu</div>,
}));

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );
};

describe("Header", () => {
  beforeEach(() => {
    global.innerWidth = 320;
  });

  it("renders the brand and navigation shell", () => {
    renderHeader();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Wetterblick")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("shows the mobile menu opener on small screens", () => {
    renderHeader();

    expect(screen.getByRole("nav-opener")).toBeInTheDocument();
  });

  it("opens the Details submenu and renders the city entries", async () => {
    renderHeader();

    fireEvent.click(screen.getByRole("button", { name: /details/i }));

    await waitFor(() => {
      expect(screen.getByText("Hamburg")).toBeInTheDocument();
      expect(screen.getByText("Berlin")).toBeInTheDocument();
    });
  });

  it("shows the guest state in the user menu", () => {
    renderHeader();

    expect(screen.getByText("Guest")).toBeInTheDocument();
  });
});
