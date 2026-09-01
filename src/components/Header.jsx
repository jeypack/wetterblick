import { Link, NavLink } from "react-router-dom";
import styles from "../Styles";
import { Menu, MenuButton, MenuItems, MenuItem, MenuSeparator } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import React, { useMemo } from "react";
import { UserShield, ChevronDownIcon } from "lucide-react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useOverlay } from "../hooks/useOverlay";
import { useWeather } from "../hooks/useWeather";
import ThemeMenu from "./ThemeMenu";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";

const navData = [
  { id: 1, name: "Wetter", path: "/" },
  { id: 2, name: "Meine Orte", path: "/favorites" },
  {
    id: 3,
    name: "Details",
    path: "/city/",
    items: [],
  },
  /* { id: 3, name: "User", path: "/user" },
  {name: "Contact", path: "/contact"}, */
];

export default function Header() {
  const { user } = useAuth();
  const { setToastMessage } = useOverlay();
  const { favoriteList, recentList } = useWeather();
  const [isLoggIn, setIsLoggIn] = React.useState(null);
  // console.log("Header: user", user);
  navData[2].items = useMemo(() => {
    const list = [];
    recentList.forEach((item) => {
      list.push({
        key: list.length,
        id: item.id,
        name: item.location.name,
        path: `/city/${item.id}`,
      });
    });
    favoriteList.forEach((item) => {
      list.push({
        key: list.length,
        id: item.id,
        name: item.location.name,
        path: `/city/${item.id}`,
      });
    });
    //remove duplicates by id
    const uniqueList = list.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return uniqueList;
  }, [recentList, favoriteList]);
  console.log("Header: navData", navData);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      setToastMessage("Erfolgreich abgemeldet");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 bg-neutral-50 border-b-12 border-neutral-400 dark:bg-neutral-800 dark:border-olive-600 flex flex-row gap-2 justify-start items-center h-16 p-4 w-full z-40">
      <div className="flex flex-row justify-start items-center gap-2 text-neutral-500 dark:text-olive-400">
        <ThemeMenu />
        <h1 className="text-xl font-bold uppercase truncate w-40 sm:w-full">
          Wetterblick
        </h1>
      </div>
      <nav className="flex flex-row justify-end items-center gap-4 w-full">
        <div className="hidden md:flex md:justify-end w-full">
          {navData.map((navItem) => (
            <Menu as="div" key={navItem.id} className="relative inline-block text-left">
              <MenuButton className={"focus-within:outline-none"}>
                {navItem.items && navItem.items.length > 0 ? (
                  <div className={styles.navlink}>
                    {navItem.name}
                    <ChevronDownIcon className="inline-block size-5 ml-1" />
                  </div>
                ) : (
                  <NavLink
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
                )}
              </MenuButton>
              {navItem.items && (
                <MenuItems
                  anchor="bottom end"
                  className="border border-neutral-400 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-900 flex flex-col focus-visible:outline-none mt-2 rounded-md w-fit min-w-30 z-50"
                >
                  {navItem.items.map((subItem) => (
                    <MenuItem key={subItem.key}>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending " + styles.navlink
                            : isActive
                              ? styles.navlinkActive
                              : styles.navlink
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    </MenuItem>
                  ))}
                </MenuItems>
              )}
            </Menu>
          ))}
        </div>

        <div className="flex flex-col justify-center items-start gap-2 z-50">
          <Menu>
            <MenuButton
              className={
                styles.icon +
                " cursor-pointer text-xs focus-visible:outline-none hover:data-open"
              }
            >
              <UserShield className="mr-2" />
              <div className="flex text-md font-bold text-neutral-500 dark:text-olive-400">
                {user ? user.displayName : "Guest"}
                <ChevronDownIcon className="inline-block size-5 ml-1" />
              </div>
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="border border-neutral-400 bg-neutral-100 dark:border-olive-500 dark:bg-olive-800 focus-visible:outline-none mt-2 rounded-md w-fit min-w-30 z-50"
            >
              <MenuItem disabled>
                <p className="block px-2 py-1 bg-neutral-50 border-neutral-500 dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-400 data-disabled:bg-neutral-400 dark:data-disabled:bg-neutral-700">
                  {user ? user?.email : "Nicht angemeldet"}
                </p>
              </MenuItem>
              <MenuSeparator className="h-px bg-neutral-700 dark:bg-neutral-400" />
              {user ? (
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className={
                      "block cursor-pointer w-full px-2 py-1 text-left bg-neutral-50 border-neutral-500 dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-400 data-focus:text-neutral-900 data-focus:bg-neutral-200 dark:data-focus:text-neutral-200 dark:data-focus:bg-neutral-700"
                    }
                  >
                    Abmelden
                  </button>
                </MenuItem>
              ) : (
                <>
                  <MenuItem>
                    <Link
                      className={
                        "flex items-center px-2 py-1 data-focus:text-neutral-900 data-focus:bg-neutral-200 dark:data-focus:text-neutral-200 dark:data-focus:bg-neutral-700 " +
                        (isLoggIn === false
                          ? "bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700"
                          : "bg-neutral-50 border-neutral-500 dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-400")
                      }
                      to="/login/login"
                      onClick={() => setIsLoggIn(false)}
                    >
                      Anmelden
                      {/* <CheckIcon
                        className={"ml-2 size-5 " + (isLoggIn === false ? "visible" : "invisible")}
                      /> */}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      className={
                        "flex items-center px-2 py-1 data-focus:text-neutral-900 data-focus:bg-neutral-200 dark:data-focus:text-neutral-200 dark:data-focus:bg-neutral-700 " +
                        (isLoggIn === true
                          ? "bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700"
                          : "bg-neutral-50 border-neutral-500 dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-400")
                      }
                      to="/login/register"
                      onClick={() => setIsLoggIn(true)}
                    >
                      Registrieren
                      {/* <CheckIcon
                        className={"ml-2 size-5 " + (isLoggIn === true ? "visible" : "invisible")}
                      /> */}
                    </Link>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Menu>
        </div>

        {/* Mobile Menu */}
        <Menu as="div" className="relative md:hidden z-50">
          <MenuButton
            role="nav-opener"
            className="inline-flex justify-center data-focus:outline-none"
          >
            <Bars3Icon className="h-6 w-6 text-gray-100" />
          </MenuButton>
          <MenuItems
            anchor={{ to: "bottom end", gap: "4px" }}
            className="mt-6 border border-neutral-600 rounded-md shadow-lg data-focus:outline-none z-50"
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
                          ? `${baseClass} pending bg-neutral-850 text-neutral-400`
                          : isActive
                            ? `${baseClass} bg-neutral-900 text-neutral-200`
                            : `${baseClass} bg-neutral-900 text-neutral-400`;
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
