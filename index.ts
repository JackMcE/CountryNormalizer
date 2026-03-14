import {
  findCountryByUnique,
  findAllMatchedCountries,
} from "./src/findCountryByUnqiue";

import { getContactFieldsByAlpha2 } from "./src/getCountryContactData";
import { getCountriesByContinent } from "./src/getCountriesByContinent";

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
};
export type {
  AllCountryFields,
  ContactCountryFields,
  ContinentNames,
  ContinentTrimmedFields,
};
