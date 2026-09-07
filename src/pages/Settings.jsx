//import { useWeather } from "../hooks/useWeather";
import PageTitle from "../components/PageTitle";
import ThemeButton from "../components/ui/ThemeButton";
import { UserShield, CircleMinus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import styles from "../Styles";
import { useOverlay } from "../hooks/useOverlay";

const Settings = () => {
  const { user } = useAuth();
  const { setToastMessage } = useOverlay();
  //const { favoriteList } = useWeather();
  //const [enabled, setEnabled] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      setToastMessage("✓ Erfolgreich abgemeldet");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <PageTitle title="User Einstellungen" />
      <main className="container flex-1 flex flex-col justify-start items-start mx-auto py-3">
        <div className="flex flex-col items-start justify-center p-3 mb-6 w-full">
          <h1 className="text-xl font-bold text-nowrap text-neutral-400">Einstellungen</h1>
        </div>
        {user && (
          <>
            <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
              <h5 className="flex justify-between items-center text-neutral-500 dark:text-olive-400">
                <UserShield className="inline mr-2" />
                Profil
              </h5>
              <hr className="w-80 border-neutral-300 dark:border-neutral-700" />
              <div className="flex flex-col justify-between items-center p-8 text-md leading-8 text-neutral-800 dark:text-neutral-400 w-80 sm:w-lg md:w-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center p-2 w-full">
                  <div>Benutzername:</div>
                  <div className="text-lg font-bold text-neutral-800 dark:text-neutral-300">{user.displayName}</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center p-2 w-full">
                  <div>Email:</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-300">{user.email}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
              <h5 className="flex justify-between items-center text-neutral-500 dark:text-olive-400">
                <UserShield className="inline mr-2" />
                Account
              </h5>
              <hr className="w-80 border-neutral-300 dark:border-neutral-700" />
              <div className="flex flex-col justify-between items-center p-8 text-md leading-8 text-neutral-800 dark:text-neutral-400 w-80 sm:w-lg md:w-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center p-2 w-full">
                  <div>Email:</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-300">{user.email}</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center p-2 w-full">
                  <div>Registriert:</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-300">
                    {new Date(user.metadata.creationTime).toLocaleString("de-DE", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center p-2 w-full">
                  <div>Zuletzt angemeldet:</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-300">
                    {new Date(user.metadata.lastSignInTime).toLocaleString("de-DE", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
          {user ? (
            <ThemeButton
              type="button"
              onClick={handleLogout}
              className="flex justify-between items-center mt-4 text-nowrap"
              size="sm"
            >
              Abmelden
              <CircleMinus size={20} className="inline ml-2" />
            </ThemeButton>
          ) : (
            <>
              <h5 className="font-medium mb-4 text-xl text-neutral-600 dark:text-olive-300">
                Melde dich an, um das volle Wettererlebnis zu nutzen
              </h5>
              <div className="flex flex-row justify-center items-center gap-4 text-neutral-500 dark:text-neutral-300 text-sm text-left mx-auto container w-full">
                <Link to="/login/login" className={styles.btn}>
                  Anmelden
                </Link>
                <Link to="/login/register" className={styles.btn}>
                  Registrieren
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default React.memo(Settings);
