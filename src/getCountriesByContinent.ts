import type {
  CountriesByContinent,
  ContinentNames,
  ContinentTrimmedFields,
} from "../types/core";
import ContinentData from "../data/countriesByContinent.json";

const continentCountryPairs = ContinentData as CountriesByContinent;

export const getCountriesByContinent = (
  searchContinent: ContinentNames,
): ContinentTrimmedFields[] => continentCountryPairs[searchContinent];
