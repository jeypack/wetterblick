import { Link, NavLink } from "react-router-dom";
import styles from "../Styles";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSeparator,
  Button,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ChartArea, Moon, Sun, Eclipse, UserShield, ChevronDownIcon } from "lucide-react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { useTheme } from "../hooks/useTheme";
import ThemeButton from "./ui/ThemeButton";
import ThemeMenu from "./ThemeMenu";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const navData = [
  { id: 1, name: "Wetter", path: "/" },
  { id: 2, name: "Favoriten", path: "/favorites" },
  /* { id: 3, name: "User", path: "/user" },
  {name: "Projects", path: "/projects"},
  {name: "FAQ", path: "/faq"},
  {name: "Contact", path: "/contact"}, */
];

export default function Header() {
  const { theme, setTheme, updateTheme } = useTheme();
  const { user } = useAuth();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 bg-neutral-50 border-b-12 border-neutral-400 dark:bg-neutral-800 dark:border-olive-600 flex flex-row gap-2 justify-start items-center h-16 mb-4 p-4 w-full z-40">
      <div className="flex flex-row justify-start items-center gap-2 text-neutral-500 dark:text-olive-400">
        {/* <ChartArea className="block size-6" /> */}
        <ThemeMenu />
        <h1 className="text-xl font-bold uppercase truncate w-40 sm:w-full">
          Climate Analytics Dashboard
        </h1>
        {/* <p className="text-neutral-400 text-xs self-baseline-last text-nowrap">v0.0.1</p> */}
      </div>
      {/* <div className="flex flex-row justify-start items-center gap-2 ml-auto">
        <ThemeMenu />
      </div> */}
      <nav className="flex flex-row justify-end items-center gap-4 w-full">
        <div className="hidden md:flex md:justify-end w-full">
          {navData.map((navItem) => (
            <NavLink
              key={navItem.id}
              to={navItem.path}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending " + styles.navlink
                  : isActive
                    ? styles.navlinkActive
                    : styles.navlink
              }
            >
              {navItem.name}
            </NavLink>
          ))}
        </div>
        {/* <Link to="/" className="text-md font-bold text-gray-400 hover:text-gray-300">
          {"User"}
        </Link> */}
        <div className="flex flex-col justify-center items-start gap-2">
          <Menu>
            <MenuButton className={styles.icon + " text-xs"}>
              <UserShield />
            </MenuButton>
            <MenuItems anchor="bottom">
              <MenuItem>
                <a className="block data-focus:bg-neutral-200" href="/settings">
                  Settings
                </a>
              </MenuItem>
              <MenuItem>
                <a className="block data-focus:bg-neutral-200" href="/login">
                  Login
                </a>
              </MenuItem>
              <MenuItem>
                <a className="block data-focus:bg-neutral-200" href="/license">
                  Registrieren
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
          {/* {user ? (
            <button onClick={handleLogout} className={styles.btn + " text-xs"}>
              Logout
            </button>
          ) : (
            
          )}
          <Link to="/" className={styles.btnActive + " text-xs"}>
            Register
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="relative inline-block size-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link> */}
          {/* <Link to="/login" className={styles.icon + " text-xs"}>
              <UserShield />
            </Link> */}
        </div>

        <Popover className="group relative z-50">
          <PopoverButton className="flex items-center text-sm text-neutral-500">
            More...
            <ChevronDownIcon className="size-5 text-neutral-500 group-data-open:rotate-180" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col justify-between items-start border border-neutral-400 bg-neutral-900 p-4 rounded-md gap-1 w-fit-content max-w-58"
          >
            <div className="flex flex-row justify-center items-center gap-3">
              <p className="text-xs text-center"></p>
              <p className="text-xs text-center"></p>
              <p className="text-xs text-center"></p>
            </div>
          </PopoverPanel>
        </Popover>
        {/* Mobile Menu */}
        <Menu as="div" className="relative md:hidden z-50">
          <MenuButton
            role="nav-opener"
            className="inline-flex justify-center focus:outline-none"
          >
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
                        const baseClass =
                          "block w-28 h-8 px-4 py-2 text-sm text-center font-bold";
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
                  {index < navData.length - 1 && (
                    <MenuSeparator className="h-px bg-gray-400" />
                  )}
                </React.Fragment>
              );
            })}
          </MenuItems>
        </Menu>
      </nav>
    </header>
  );
}
