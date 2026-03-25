import { findCountryByUnique } from "./src/findCountryByUnqiue";
import { findAllMatchedCountries } from "./src/findAllMatchedCountries";

import { getContactFieldsByAlpha2 } from "./src/getCountryContactData";
import { getCountriesByContinent } from "./src/getCountriesByContinent";
import { getAllCountries } from "./src/getAllCountries";

import type {
  AllCountryFields,
  ContactCountryFields,
  ContinentNames,
  ContinentTrimmedFields,
} from "./types/core";

export {
  findCountryByUnique,
  findAllMatchedCountries,
  getContactFieldsByAlpha2,
  getCountriesByContinent,
  getAllCountries,
};

export type {
  AllCountryFields,
  ContactCountryFields,
  ContinentNames,
  ContinentTrimmedFields,
};
