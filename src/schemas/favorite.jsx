import { object, string } from "yup";

const schemaFavorite = object({
  title: string()
    .required("Bitte einen gültigen Titel eingeben.")
    .matches(/^[a-zA-Z0-9_\- ]{3,30}$/, "Titel muss zwischen 3 und 30 Zeichen lang sein und darf nur Buchstaben, Zahlen, Leerzeichen, Minuszeichen und Unterstriche enthalten."),
  note: string()
    .required("Bitte eine gültige Notiz eingeben.")
    .max(200, "Notiz darf maximal 200 Zeichen lang sein."),
});

export { schemaFavorite };
