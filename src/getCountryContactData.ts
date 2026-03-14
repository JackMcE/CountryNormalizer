import contactFieldsData from "../data/contactFields.json";
import type { ContactCountryFields } from "../types/core";

const contactData = contactFieldsData as Record<string, ContactCountryFields>;

/**
 * Allows for querying of all countries contact data by using the ISO Alpha 2 of any given country.
 * Contact fields are a countries calling code(s), flag emoji, and top-level domain extension.
 *
 * @param {string} inputAlpha2
 * @returns {ContactCountryFields | null}
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
