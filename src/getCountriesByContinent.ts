import type {
  CountriesByContinent,
  ContinentNames,
  ContinentTrimmedFields,
} from "../types/core";
import ContinentData from "../data/countriesByContinent.json";

const continentCountryPairs = ContinentData as CountriesByContinent;

/**
 * Returns a trimmed set of country data for every country on the specified continent.
 *
 * The returned fields include the guaranteed unique identifier and display fields,
 * with calling codes, demonyms, and other contact fields omitted.
 * Use {@link findAllMatchedCountries} with a continent name if you need full country data for each entry.
 *
 * @param searchContinent - A continent name from the {@link ContinentNames} enum.
 * @returns An array of trimmed country data for all countries on the given continent.
 *
 * @example
 * getCountriesByContinent(ContinentNames.Antarctica); // Returns trimmed data for all Antarctic territories
 * getCountriesByContinent(ContinentNames.Asia);       // Returns trimmed data for all Asian countries
 */
export const getCountriesByContinent = (
  searchContinent: ContinentNames,
): ContinentTrimmedFields[] => continentCountryPairs[searchContinent];
