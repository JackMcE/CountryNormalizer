import allCountriesData from "../data/complete.json";
import type { AllCountryFields } from "../types/core";

const allCountries = allCountriesData as AllCountryFields[];

export const findCountryByUnique = (
  needle: string | number,
): AllCountryFields | null => {
  const isNeedleNumber = Number(needle);

  // In the event the needle input is a number check the ISO number codes first.
  // No other field type is a number so we can get this evaluation out of the way quickly.
  if (!isNaN(isNeedleNumber)) {
    return allCountries.find((c) => c.num_code === needle) ?? null;
  }

  // Revalidate needle is a string (Keeps typescript in-check since we already know it isn't a number) then convert to lowercase and trim so it is easier to work with.
  const forgedNeedle =
    typeof needle === "string" ? needle.toLowerCase().trim() : "";

  return (
    allCountries.find((c) => c.alpha_2.toLowerCase() === forgedNeedle) ??
    allCountries.find((c) => c.alpha_3.toLowerCase() === forgedNeedle) ??
    allCountries.find((c) => c.english_clean.toLowerCase() === forgedNeedle) ??
    allCountries.find((c) => c.formal_order.toLowerCase() === forgedNeedle) ??
    allCountries.find(
      (c) => c.common_reference.toLowerCase() === forgedNeedle,
    ) ??
    null
  );
};
