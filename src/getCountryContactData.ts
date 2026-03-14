import contactFieldsData from "../data/contactFields.json";
import type { ContactCountryFields } from "../types/core";

const contactData = contactFieldsData as Record<string, ContactCountryFields>;

/**
 * Returns the contact fields — calling code(s), flag emoji, and top-level domain — for a country
 * identified by its ISO 3166-1 alpha-2 code.
 *
 * Since contact field lookups are commonly performed on open-ended user input, the input
 * is matched case-insensitively. If the input is not exactly 2 characters, `null` is returned.
 *
 * @param inputAlpha2 - A 2-character ISO 3166-1 alpha-2 country code (e.g. `"US"`, `"GB"`).
 * @returns The contact fields for the matching country, or `null` if no match is found.
 *
 * @example
 * getContactFieldsByAlpha2("GN"); // Returns { tld: ".gn", flag_emoji: "🇬🇳", calling_code: ["224"] }
 * getContactFieldsByAlpha2("XX"); // Returns null
 */
export const getContactFieldsByAlpha2 = (
  inputAlpha2: string,
): ContactCountryFields | null => {
  if (inputAlpha2.length !== 2) {
    console.warn(
      `Getting contact fields for a country requires the ISO 3166-1 alpha-2 value. ${inputAlpha2} is an incorrect length.`,
    );

    return null;
  }

  return contactData[inputAlpha2.toUpperCase()] || null;
};
