import { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@headlessui/react";

/**
 * Login page component.
 * Handles both login and registration views based on the URL parameter.
 * Utilizes the useAuth hook to determine the current authentication status.
 * Redirects authenticated users to the main dashboard.
 *
 * @returns {JSX.Element} The login page component.
 */
export default function Login() {
  const { type } = useParams();
  const navigate = useNavigate();
  const isRegister = type === "register";
  // Holt den aktuell authentifizierten Benutzer über den Authentifizierungs-Hook.
  // Wenn niemand eingeloggt ist, ist "user" null oder undefined.
  const { user } = useAuth();
  // Dieser State bestimmt, ob die Registrierungsseite angezeigt werden soll.
  // Zu Beginn ist er false, deshalb wird zunächst die Login-Seite angezeigt
  const [showRegister, setShowRegister] = useState(isRegister);

  useEffect(() => {
    // Wenn der Benutzer auf die Login-Seite navigiert, wird showRegister auf false gesetzt.
    // Wenn der Benutzer auf die Register-Seite navigiert, wird showRegister auf true gesetzt.
    setShowRegister(isRegister);
  }, [isRegister]);

  const handleCancel = () => {
    navigate("/");
  };

  // Wenn kein Benutzer angemeldet ist...
  if (!user) {
    // Wenn der Benutzer zur Registrierung wechseln möchte,
    // wird die Register-Komponente angezeigt.
    if (showRegister) {
      return (
        <div className="flex-1 flex flex-col justify-start items-center gap-4 p-4 w-full">
          <PageTitle title="Wetter - Registrierung" />
          <p className="text-neutral-500 dark:text-neutral-400 text-md max-w-2xl text-center">
            Bitte registrieren dich, um auf das Dashboard zuzugreifen. Nach der
            Registrierung werden deine zuletzt besuchten Orte und Favoriten gespeichert.
          </p>
          <RegisterForm
            // Wenn onSwitch aufgerufen wird, wechseln wir zurück zur Login-Seite.
            onSwitch={() => setShowRegister(false)}
          />
          <Button
            className="text-neutral-500 dark:text-neutral-400 hover:underline"
            onClick={handleCancel}
          >
            Abbrechen und zurück zur Hauptseite
          </Button>
        </div>
      );
    }
    return (
      <div className="flex-1 flex flex-col justify-start items-center gap-4 p-4 w-full">
        <PageTitle title="Wetter - Anmeldung" />
        <p className="text-neutral-500 dark:text-neutral-400 text-md max-w-2xl text-center">
          Bitte melde dich an, um auf das Dashboard zuzugreifen. Nach der Anmeldung werden
          deine zuletzt besuchten Orte und Favoriten angezeigt.
        </p>
        <LoginForm
          // Wenn der Benutzer auf "Registrieren" klickt,
          // wird showRegister auf true gesetzt.
          // Dadurch wird anschließend die Register-Seite angezeigt.
          onSwitch={() => setShowRegister(true)}
        />
        <Button
          className="text-neutral-500 dark:text-neutral-400 hover:underline"
          onClick={handleCancel}
        >
          Abbrechen und zurück zur Hauptseite
        </Button>
      </div>
    );
  }
  return <Navigate to="/" replace />;
}
