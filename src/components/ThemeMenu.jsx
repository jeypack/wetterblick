import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Moon, Sun, Eclipse } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

/**
 * ThemeMenu component for rendering a theme selection menu with light, dark, and system options.
 *
 * @returns JSX.Element
 */
const ThemeMenu = () => {
  const { theme, setTheme, updateTheme } = useTheme();

  return (
    <Menu>
      <MenuButton className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-olive-700 p-1.5 rounded-lg">
        {theme.mode === "light" ? (
          <Sun />
        ) : theme.mode === "dark" ? (
          <Moon />
        ) : (
          <Eclipse />
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-olive-500 gap-2 mt-2 rounded-lg w-22 z-50"
      >
        <MenuItem>
          <button
            className="cursor-pointer flex justify-center items-center data-focus:bg-neutral-200 dark:data-focus:bg-neutral-800 p-2 text-neutral-500 dark:text-olive-400"
            onClick={() => updateTheme({ mode: "light" })}
          >
            <Sun />
            <span className="ml-2">Light</span>
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="cursor-pointer flex justify-center items-center data-focus:bg-neutral-200 dark:data-focus:bg-neutral-800 p-2 text-neutral-500 dark:text-olive-400"
            onClick={() => updateTheme({ mode: "dark" })}
          >
            <Moon />
            <span className="ml-2">Dark</span>
          </button>
        </MenuItem>
        {/* <MenuItem>
          <button className="flex justify-center items-center data-focus:bg-olive-100 text-olive-400" onClick={() => updateTheme({ mode: "system" })}> 
            <Eclipse />{" "}System
          </button>
        </MenuItem> */}
      </MenuItems>
    </Menu>
  );
};

export default ThemeMenu;
