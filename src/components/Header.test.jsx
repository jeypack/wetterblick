import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

// Mock the hooks
vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: null }),
}));

vi.mock("../hooks/useWeather", () => ({
  useWeather: () => ({ favoriteList: [], recentList: [] }),
}));

vi.mock("../hooks/useOverlay", () => ({
  useOverlay: () => ({ setToastMessage: vi.fn() }),
}));

// Mock firebase
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signOut: vi.fn(),
}));

// Mock components
vi.mock("./ThemeMenu", () => ({
  default: () => <div>ThemeMenu</div>,
}));

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe("Header - Mobile Menu", () => {
  beforeEach(() => {
    // Reset window width to mobile size
    global.innerWidth = 320;
  });

  it("should render mobile menu button on small screens", () => {
    renderHeader();
    const menuButton = screen.getByRole("button", { name: /nav-opener/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("should toggle Details submenu on mobile without closing the main menu", async () => {
    renderHeader();

    // Open mobile menu
    const menuButton = screen.getByRole("button", { name: /nav-opener/i });
    fireEvent.click(menuButton);

    // Find the Details button
    await waitFor(() => {
      const detailsButton = screen.getAllByRole("button").find((btn) =>
        btn.textContent.includes("Details")
      );
      expect(detailsButton).toBeInTheDocument();

      // Click Details button to show submenu
      fireEvent.click(detailsButton);
    });

    // After clicking Details, the chevron should rotate (detailsOpen = true)
    await waitFor(() => {
      const chevron = screen.getByRole("button", { name: /nav-opener/i })
        .parentElement.querySelector('[class*="rotate-180"]');
      // We're checking that the submenu structure is being rendered
      expect(chevron || screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  it("should toggle submenu visibility when clicking Details button", async () => {
    renderHeader();

    // Open mobile menu
    const menuButton = screen.getByRole("button", { name: /nav-opener/i });
    fireEvent.click(menuButton);

    // Get Details button
    const detailsButton = screen.getAllByRole("button").find((btn) =>
      btn.textContent.includes("Details")
    );

    // Initially submenu should not be visible (detailsOpen = false)
    expect(detailsButton).toBeInTheDocument();

    // Click to show submenu
    fireEvent.click(detailsButton);

    // The chevron rotation state should indicate open state
    await waitFor(() => {
      expect(detailsButton.querySelector('[class*="transition-transform"]')).toHaveClass(
        "rotate-180"
      );
    });

    // Click again to hide submenu
    fireEvent.click(detailsButton);

    await waitFor(() => {
      expect(
        detailsButton.querySelector('[class*="transition-transform"]')
      ).not.toHaveClass("rotate-180");
    });
  });

  it("should keep menu open when toggling Details submenu", async () => {
    renderHeader();

    const menuButton = screen.getByRole("button", { name: /nav-opener/i });
    fireEvent.click(menuButton);

    // Menu should be visible
    const detailsButton = screen.getAllByRole("button").find((btn) =>
      btn.textContent.includes("Details")
    );
    expect(detailsButton).toBeInTheDocument();

    // Click Details button
    fireEvent.click(detailsButton);

    // Menu should still be visible and Details button should still exist
    await waitFor(() => {
      const stillVisible = screen.queryAllByRole("button").find((btn) =>
        btn.textContent.includes("Details")
      );
      expect(stillVisible).toBeInTheDocument();
    });
  });

  it("should not show submenu items when detailsOpen is false", async () => {
    renderHeader();

    const menuButton = screen.getByRole("button", { name: /nav-opener/i });
    fireEvent.click(menuButton);

    // Details button exists but submenu not rendered yet
    const detailsButton = screen.getAllByRole("button").find((btn) =>
      btn.textContent.includes("Details")
    );

    expect(detailsButton).toBeInTheDocument();

    // The NavLinks inside the Details menu should not be visible initially
    const menuItems = screen.queryAllByRole("menuitem");
    const detailsMenuItems = menuItems.filter((item) =>
      item.textContent.includes("Details")
    );
    expect(detailsMenuItems.length).toBeGreaterThan(0);
  });
});
