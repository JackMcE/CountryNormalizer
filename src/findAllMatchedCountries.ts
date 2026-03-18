import allCountriesData from "../data/complete.json";
import type { AllCountryFields } from "../types/core";
import { hasMatchingCallingCode } from "./utils/callingCodesValidator";
import { matchesCleanedDomain } from "./utils/domainValidator";

const allCountries = allCountriesData as AllCountryFields[];

/**
 * Searches all country data fields — including non-unique fields — and returns every
 * country that matches the given needle.
 *
 * Unlike {@link findCountryByUnique}, this also searches across:
 * - `calling_code` — phone calling codes (e.g. `"+1"`, `"44"`)
 * - `continent` — continent name (e.g. `"Asia"`)
 * - `demonym_male` / `demonym_female` — demonyms (e.g. `"Canadian"`)
 * - `tld` — top-level domain (e.g. `".uk"`)
 *
 * All unique fields (`alpha_2`, `alpha_3`, `english_clean`, `formal_order`,
 * `common_reference`, `flag_emoji`, `num_code`) are searched as well.
 *
 * @param needle - The search value: a country name, ISO code, numeric code, calling code,
 *   continent name, demonym, TLD, or flag emoji.
 * @returns An array of all matching countries. Returns an empty array if no matches are found.
 *
 * @example
 * findAllMatchedCountries("+1");     // All countries sharing calling code "1"
 * findAllMatchedCountries("asia");   // All countries in Asia
 * findAllMatchedCountries("GB");     // Single-item array with United Kingdom data
 * findAllMatchedCountries("zzzzz"); // []
 */
export const findAllMatchedCountries = (
  needle: string | number,
): AllCountryFields[] => {
  const matchedCountries: AllCountryFields[] = [];

  const forgedNeedle =
    typeof needle === "string" ? needle.toLowerCase().trim() : "";

  for (const country of allCountries) {
    const {
      common_reference,
      english_clean,
      formal_order,
      alpha_2,
      alpha_3,
      num_code,
      demonym_male,
      demonym_female,
      tld,
      flag_emoji,
      calling_code,
      continent,
    } = country;

    // Check if the needle is a number and then if it matches the number code.
    if (typeof needle === "number" && needle === num_code) {
      matchedCountries.push(country);

      continue;
    }

    // Check if someone is just asking for a continent worth of countries first.
    if (forgedNeedle === continent.toLowerCase()) {
      matchedCountries.push(country);

      continue;
    }

    // See if search term matches common_reference
    if (forgedNeedle === common_reference.toLocaleLowerCase()) {
      matchedCountries.push(country);

      continue;
    }

    // See if search term match english_clean
    if (forgedNeedle === english_clean.toLocaleLowerCase()) {
      matchedCountries.push(country);

      continue;
    }

    // See if search term match formal_order
    if (forgedNeedle === formal_order.toLocaleLowerCase()) {
      matchedCountries.push(country);

      continue;
    }

    // See if search term match alpha_2
    if (forgedNeedle === alpha_2.toLocaleLowerCase()) {
      matchedCountries.push(country);

      continue;
    }

    // See if search term match alpha_3
    if (forgedNeedle === alpha_3.toLocaleLowerCase()) {
      matchedCountries.push(country);

      continue;
    }

    // See if search term match demonym_male or demonym_female
    if (
      forgedNeedle === demonym_male.toLocaleLowerCase() ||
      forgedNeedle === demonym_female.toLocaleLowerCase()
    ) {
      matchedCountries.push(country);

      continue;
    }

    // See if search term match flag_emoji
    if (forgedNeedle === flag_emoji.toLocaleLowerCase()) {
      matchedCountries.push(country);

      continue;
    }

    // Check if the input string meets the format and matches any TLDs or not.
    if (matchesCleanedDomain(forgedNeedle, tld)) {
      matchedCountries.push(country);

      continue;
    }

    // Check if the input string meets the format and matches any calling codes or not.
    // Takes needle since function handles calling code format evaluation.
    if (hasMatchingCallingCode(needle, calling_code)) {
      matchedCountries.push(country);

      continue;
    }
  }

  return matchedCountries;
};
