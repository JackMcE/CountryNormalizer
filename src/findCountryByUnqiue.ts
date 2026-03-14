import allCountriesData from "../data/complete.json";
import type { AllCountryFields } from "../types/core";
import { matchesCleanedDomain } from "./utils/domainValidator";
import { hasMatchingCallingCode } from "./utils/callingCodesValidator";

const allCountries = allCountriesData as AllCountryFields[];

/**
 * Searches all guaranteed unique country data fields and returns the single matching country.
 *
 * Fields searched (in order):
 * - ISO 3166-1 numeric code (`num_code`)
 * - ISO 3166-1 alpha-2 (`alpha_2`)
 * - ISO 3166-1 alpha-3 (`alpha_3`)
 * - `english_clean` — English country name from the ISO 3166 standard
 * - `formal_order` — naturally spoken order of the formal country name
 * - `flag_emoji` — Unicode flag emoji for the country
 * - `common_reference` — casual/colloquial country name
 * - `tld (top-level domain)` - Searches for the countries top-level domain match.
 *
 * This will **not** search non-unique fields like calling codes, continents, or demonyms.
 * Use {@link findAllMatchedCountries} for those lookups.
 *
 * String inputs must be at least 2 characters. Numeric inputs must be positive.
 *
 * @param needle - The search value: a country name, ISO code, numeric code, or flag emoji.
 * @returns The matching country data, or `null` if no match is found.
 *
 * @example
 * findCountryByUnique("US");    // Returns United States data
 * findCountryByUnique(840);     // Returns United States data (by numeric code)
 * findCountryByUnique("🇺🇸");  // Returns United States data (by flag emoji)
 * findCountryByUnique("xx");    // Returns null
 */
export const findCountryByUnique = (
  needle: string | number,
): AllCountryFields | null => {
  if (typeof needle === "string" && needle.length < 2) {
    console.warn(
      "Needle search string for country lookup must be at least two characters.",
    );

    return null;
  }

  const needleAsNumber = Number(needle);

  if (!Number.isNaN(needleAsNumber)) {
    if (needleAsNumber < 0) {
      console.warn(
        "Needle search for country when using number lookup must be greater than zero.",
      );

      return null;
    }

    return allCountries.find((c) => c.num_code === needleAsNumber) ?? null;
  }

  // Revalidate needle is a string (Keeps typescript in-check since we already know it isn't a number) then convert to lowercase and trim so it is easier to work with.
  const forgedNeedle =
    typeof needle === "string" ? needle.toLowerCase().trim() : "";

  return (
    allCountries.find((c) => c.alpha_2.toLowerCase() === forgedNeedle) ??
    allCountries.find((c) => c.alpha_3.toLowerCase() === forgedNeedle) ??
    allCountries.find((c) => c.english_clean.toLowerCase() === forgedNeedle) ??
    allCountries.find((c) => c.formal_order.toLowerCase() === forgedNeedle) ??
    allCountries.find((c) => matchesCleanedDomain(forgedNeedle, c.tld)) ??
    allCountries.find((c) => c.flag_emoji.toLowerCase() === forgedNeedle) ??
    allCountries.find(
      (c) => c.common_reference.toLowerCase() === forgedNeedle,
    ) ??
    null
  );
};

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
