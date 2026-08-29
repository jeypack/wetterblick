import { useState } from "react";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Navigate } from "react-router";

export default function Login() {
  // Holt den aktuell authentifizierten Benutzer über den Authentifizierungs-Hook.
  // Wenn niemand eingeloggt ist, ist "user" null oder undefined.
  const { user } = useAuth();
  // Dieser State bestimmt, ob die Registrierungsseite angezeigt werden soll.
  // Zu Beginn ist er false, deshalb wird zunächst die Login-Seite angezeigt
  const [showRegister, setShowRegister] = useState(false);

  // Wenn kein Benutzer angemeldet ist...
  if (!user) {
    // Wenn der Benutzer zur Registrierung wechseln möchte,
    // wird die Register-Komponente angezeigt.
    if (showRegister) {
      return (
        <div className="flex-1 flex flex-col justify-start items-center gap-4 p-4 w-full">
          <PageTitle title="Weather Dashboard - Register" />
          <p className="text-neutral-500 dark:text-neutral-400 text-md max-w-2xl text-center">
            Bitte registrieren dich, um auf das Dashboard zuzugreifen. Nach der
            Registrierung werden deine zuletzt besuchten Orte und Favoriten gespeichert.
          </p>
          <RegisterForm
            // Wenn onSwitch aufgerufen wird, wechseln wir zurück zur Login-Seite.
            onSwitch={() => setShowRegister(false)}
          />
        </div>
      );
    }
    return (
      <div className="flex-1 flex flex-col justify-start items-center gap-4 p-4 w-full">
        <PageTitle title="Weather Dashboard - Login" />
        <p className="text-neutral-500 dark:text-neutral-400 text-md max-w-2xl text-center">
          Bitte melde dich an, um auf das Dashboard zuzugreifen. Nach der
          Anmeldung werden deine zuletzt besuchten Orte und Favoriten angezeigt.
        </p>
        <LoginForm
          // Wenn der Benutzer auf "Registrieren" klickt,
          // wird showRegister auf true gesetzt.
          // Dadurch wird anschließend die Register-Seite angezeigt.
          onSwitch={() => setShowRegister(true)}
        />
      </div>
    );
  }
  return <Navigate to="/" replace />;
}
