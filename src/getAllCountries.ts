import completeCountryData from "../data/complete.json";
import type { AllCountryFields } from "../types/core";

const allCountries = completeCountryData as AllCountryFields[];

/**
 * Dumps all countries and their data fields to a massive array of objects.
 * This may be helpful for understanding the data shapes, visualizing all the data, or shaping information in ways the package functions/APIs do not support natively.
 *
 * @returns {AllCountryFields[]}
 */
export const getAllCountries = (): AllCountryFields[] => {
  return allCountries;
};
