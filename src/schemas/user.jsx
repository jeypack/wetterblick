import { object, string } from "yup";

/* const schema = object({
  password: string()
    .required("Bitte ein gültiges Passwort eingeben.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    ),
  username: string()
    .required("Bitte einen gültigen Benutzernamen eingeben.")
    .matches(
      /^[a-zA-Z0-9_]{3,20}$/,
      "Benutzername muss zwischen 3 und 20 Zeichen lang sein und darf nur Buchstaben, Zahlen und Unterstriche enthalten.",
    ),
}); */

/**
 * Schema for validating user registration data.
 * Ensures that the username, password, and email fields meet specific requirements.
 *
 */
const schemaRegister = object({
  username: string()
    .required("Bitte einen gültigen Benutzernamen eingeben.")
    .matches(
      /^[a-zA-Z0-9_]{3,20}$/,
      "Benutzername muss zwischen 3 und 20 Zeichen lang sein und darf nur Buchstaben, Zahlen und Unterstriche enthalten.",
    ),
  password: string()
    .required("Bitte ein gültiges Passwort eingeben.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    ),
  email: string()
    .required("Bitte eine gültige Email eingeben.")
    .email("Bitte eine gültige Email eingeben."),
});

export { schemaRegister };

/**
 * Schema for validating user login data.
 * Ensures that the password and email fields meet specific requirements.
 *
 * @var {Object} The validation schema for user login.
 */
const schema = object({
  password: string()
    .required("Bitte ein gültiges Passwort eingeben.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    ),
  email: string()
    .required("Bitte eine gültige Email eingeben.")
    .email("Bitte eine gültige Email eingeben."),
});

export default schema;
