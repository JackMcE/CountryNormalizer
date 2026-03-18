import allCountriesData from "../data/complete.json";
import type { AllCountryFields } from "../types/core";
import { matchesCleanedDomain } from "./utils/domainValidator";

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

  if (typeof needle === "string" && needle.length > 75) {
    console.warn(
      "No country value is more than 75 characters. No data would be returned. Skipping search.",
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
