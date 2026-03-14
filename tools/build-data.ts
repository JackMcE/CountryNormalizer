import csv from "csvtojson";
import fs from "fs/promises";
import path from "path";
import { pick, mapValues, groupBy, snakeCase, mapKeys } from "lodash";

import type {
  AllCountryFields,
  ContactCountryFields,
  CountriesByContinent,
} from "../types/core";

const BASE_DIR = import.meta.dir; // resolves to /tools/build-data/

const MASTER_CSV = path.join(BASE_DIR, "../raw_data/master-data-record.csv");
const BASE_OUTPUT_PATH = path.join(BASE_DIR, "../data/");

const VALID_FIELDS = [
  "common_reference",
  "english_clean",
  "formal_order",
  "alpha_2",
  "alpha_3",
  "num_code",
  "demonym_male",
  "demonym_female",
  "gendered_demonym",
  "tld",
  "flag_emoji",
  "calling_code",
  "continent",
];

/**
 * Pulls in the master data file in CSV form.
 * Validates that all required fields are present on each country.
 * Handles some light work of casting some data from spreadsheet cell strings into javascript arrays or booleans.
 *
 * @returns void
 */
const getValidatedAndFormattedRaw = async (): Promise<AllCountryFields[]> => {
  console.log(`Master CSV Path: ${MASTER_CSV}`);

  const csvData = await csv().fromFile(MASTER_CSV);

  const validFieldsCount = VALID_FIELDS.length;

  for (const country of csvData) {
    const fields = Object.keys(country);

    if (fields.length !== validFieldsCount) {
      console.error("Raw Country Info:", country);
      console.error("Fields between countries must match exactly.");
      console.error(`Valid fields are: ${VALID_FIELDS.join(", ")}`);
      console.error(`Fields attached to country: ${fields.join(", ")}`);
      throw new Error(
        "There is a mismatch on the valid fields from the source data set! See above for debugging info.",
      );
    }

    for (const reqField of VALID_FIELDS) {
      if (!fields.includes(reqField)) {
        console.error(`Missing required field: ${reqField}`);
        console.error("Country missing field:", country);
        throw new Error(
          "Required field property is missing from country data. See above for debugging info.",
        );
      }
    }

    country.gendered_demonym =
      country.gendered_demonym.toLowerCase() === "false";

    country.calling_code =
      country.calling_code === "FALSE" ? [] : country.calling_code.split(",");

    country.num_code = Number(country.num_code);
  }

  console.info("All country data fields validated successfully!");

  return csvData satisfies AllCountryFields[];
};

/**
 * Simply converts the master CSV data file into a usable JSON object.
 * Built on the back of the validateAndFormatRaw() function.
 */
const completeDataFile = async (allData: AllCountryFields[]) => {
  const outputPath = path.join(BASE_OUTPUT_PATH, "complete.json");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(allData, null, 4), "utf-8");
};

/**
 * Creates a much smaller (~73%) JSON object with all telecomm fields for countries that can be referenced via their alpha_2 ISO.
 * Apps routinely need to look up TLDs or calling codes for countries. Often times pairing the countries flag with it.
 * The overall object for all country data is rather large. This gets a smaller one effective for treeshaking and client-side operations.
 */
const writeContactFieldsOnly = async (
  allData: AllCountryFields[],
): Promise<void> => {
  const isoFlagMap = allData.reduce(
    (acc, country) => {
      const pickedFields = pick(country, ["tld", "flag_emoji", "calling_code"]);

      acc[country.alpha_2] = pickedFields;

      return acc;
    },
    {} as Record<string, ContactCountryFields>,
  );

  const outputPath = path.join(BASE_OUTPUT_PATH, "contactFields.json");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(isoFlagMap, null, 4), "utf-8");
};

const writeCountriesGroupedByContinent = async (
  allData: AllCountryFields[],
): Promise<void> => {
  const pickFields = [
    "english_clean",
    "formal_order",
    "alpha_2",
    "alpha_3",
    "num_code",
    "tld",
    "flag_emoji",
  ];

  const byContinent = mapValues(groupBy(allData, "continent"), (countries) =>
    countries.map((c) => pick(c, pickFields)),
  );

  const remappedContinentNames = mapKeys(byContinent, (_, key) =>
    snakeCase(key),
  ) as CountriesByContinent;

  const outputPath = path.join(BASE_OUTPUT_PATH, "countriesByContinent.json");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    JSON.stringify(remappedContinentNames, null, 4),
    "utf-8",
  );
};

const main = async (): Promise<void> => {
  console.log("GETTING AND VALIDATING ALL COUNTRIES:");
  const allData = await getValidatedAndFormattedRaw();

  console.log("WRITING ALL COUNTRY DATA FILES...");
  completeDataFile(allData);
  writeContactFieldsOnly(allData);
  writeCountriesGroupedByContinent(allData);
  console.log("Done! Wrote to directory:", BASE_OUTPUT_PATH);
};

main();
