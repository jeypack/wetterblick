import { Link, NavLink } from "react-router-dom";
import styles from "../Styles";
import { Menu, MenuButton, MenuItems, MenuItem, MenuSeparator } from "@headlessui/react";
import { ChartArea } from "lucide-react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { useUser } from "../hooks/useUser";
import { useTheme } from "../hooks/useTheme";
import ThemeButton from "./ui/ThemeButton";

const navData = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  /* {name: "Projects", path: "/projects"},
  {name: "FAQ", path: "/faq"},
  {name: "Contact", path: "/contact"}, */
];

export default function Header() {
  const { user } = useUser();
  const { theme, setTheme, updateTheme } = useTheme();

  return (
    <header className="sticky top-0 bg-neutral-50 border-b-12 border-neutral-400 dark:bg-neutral-800 dark:border-olive-600 flex flex-row gap-2 justify-start items-center h-16 mb-4 p-4 w-full z-40">
      <Link to="/" className="text-md font-bold text-gray-400 hover:text-gray-300">
        {user?.name}
      </Link>
      <div className="flex flex-row justify-start items-center gap-2 text-neutral-500 dark:text-olive-400">
        <ChartArea className="block size-6" />
        <h1 className="text-xl font-bold uppercase truncate w-40 sm:w-full">
          Climate Analytics Dashboard
        </h1>
        {/* <p className="text-neutral-400 text-xs self-baseline-last text-nowrap">v0.0.1</p> */}
      </div>
      <div className="flex flex-row justify-start items-center gap-2 ml-auto">
          <div className="flex flex-row justify-center items-start gap-2">
            <ThemeButton
              onClick={() => updateTheme({ mode: "light" })}
              active={theme.mode === "light"}
              size={"xs"}
            >
              Light
            </ThemeButton>
            <ThemeButton
              onClick={() => updateTheme({ mode: "dark" })}
              active={theme.mode === "dark"}
              size={"xs"}
            >
              Dark
            </ThemeButton>
          </div>
        </div>
      <nav className="flex flex-row justify-center items-center gap-4 w-full">
        <div className="hidden md:flex md:justify-end w-full">
          {navData.map((navItem) => (
            <NavLink
              key={navItem.path}
              to={navItem.path}
              className={({ isActive, isPending }) =>
                isPending ? "pending " + styles.navlink : isActive ? styles.navlinkActive : styles.navlink
              }
            >
              {navItem.name}
            </NavLink>
          ))}
        </div>

        
        {/* Mobile Menu */}
        <Menu as="div" className="relative md:hidden pr-2 z-50">
          <MenuButton role="nav-opener" className="inline-flex justify-center focus:outline-none">
            <Bars3Icon className="h-6 w-6 text-gray-100" />
          </MenuButton>
          <MenuItems
            anchor={{ to: "bottom end", gap: "4px" }}
            className="mt-6 border border-slate-600 rounded-md shadow-lg focus:outline-none"
            transition
          >
            {navData.map((value, index) => {
              return (
                <React.Fragment key={value.path}>
                  <MenuItem>
                    <NavLink
                      to={value.path}
                      className={({ isActive, isPending }) => {
                        const baseClass = "block w-28 h-8 px-4 py-2 text-sm text-center font-bold";
                        return isPending
                          ? `${baseClass} pending bg-slate-850 text-gray-400`
                          : isActive
                            ? `${baseClass} bg-slate-900 text-gray-200`
                            : `${baseClass} bg-slate-900 text-gray-400`;
                      }}
                    >
                      {value.name}
                    </NavLink>
                  </MenuItem>
                  {index < navData.length - 1 && <MenuSeparator className="h-px bg-gray-400" />}
                </React.Fragment>
              );
            })}
          </MenuItems>
        </Menu>
      </nav>
    </header>
  );
}
