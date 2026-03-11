import allCountriesData from "../data/complete.json";
import type { AllCountryFields } from "../types/core";
import { matchesCleanedDomain } from "./utils/domainValidator";
import { hasMatchingCallingCode } from "./utils/callingCodesValidator";

const allCountries = allCountriesData as AllCountryFields[];

/**
 * Performs a search on all guaranteed unique country data fields and returns the singular matching result.
 * This will not search for things like phone codes, or continents for example since these are not guaranteed to be unique. In-fact many are shared across countries.
 *
 * @param {string | number} needle
 * @returns {AllCountryFields | null}
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
    allCountries.find((c) => c.flag_emoji.toLowerCase() === forgedNeedle) ??
    allCountries.find(
      (c) => c.common_reference.toLowerCase() === forgedNeedle,
    ) ??
    null
  );
};

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
