import { object, string } from "yup";

/**
 * Schema for validating favorite items.
 * Ensures that the title and note fields meet specific requirements
 */
const schemaFavorite = object({
  title: string()
    .required("Bitte einen gültigen Titel eingeben.")
    .matches(
      /^[\p{L}0-9_#",:; \-]{3,30}$/u,
      'Titel muss zwischen 3 und 30 Zeichen lang sein und darf nur Buchstaben (inklusive Umlaute), Zahlen, Leerzeichen, Minuszeichen, Unterstriche sowie #, ", ,, : und ; enthalten.',
    ),
  note: string()
    .required("Bitte eine gültige Notiz eingeben.")
    .max(200, "Notiz darf maximal 200 Zeichen lang sein."),
});

export { schemaFavorite };
