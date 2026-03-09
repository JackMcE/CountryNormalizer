import { map } from "lodash";

import { findCountryByUnique } from "./findCountryByUnqiue";
import AllCountriesData from "../data/complete.json";

describe("Check that all number codes align to expected country name", () => {
  const allIsoNumbers = map(AllCountriesData, "num_code");
  const englishNames = map(AllCountriesData, "english_clean");

  for (const numCode of allIsoNumbers) {
    const engNameOfCode = englishNames[allIsoNumbers.indexOf(numCode)];

    test(`${numCode} returns ${engNameOfCode}`, () => {
      const lookup = findCountryByUnique(numCode);

      expect(lookup).not.toBe(null);
      expect(lookup?.num_code).toBe(numCode);
      expect(lookup?.english_clean).toBe(engNameOfCode);
    });
  }
});

describe("Manually validate full country returns from ISO numbers", () => {
  test("643 code returns Russia data", () => {
    const lookup = findCountryByUnique(643);

    expect(lookup).toMatchObject({
      common_reference: "Russian Federation",
      english_clean: "Russian Federation",
      formal_order: "Russian Federation",
      alpha_2: "RU",
      alpha_3: "RUS",
      num_code: 643,
      demonym_male: "Russian",
      demonym_female: "Russian",
      gendered_demonym: true,
      tld: ".ru",
      flag_emoji: "🇷🇺",
      calling_code: ["7"],
      continent: "Europe",
    });
  });

  test("124 code returns Canada data", () => {
    const lookup = findCountryByUnique(124);

    expect(lookup).toMatchObject({
      common_reference: "Canada",
      english_clean: "Canada",
      formal_order: "Canada",
      alpha_2: "CA",
      alpha_3: "CAN",
      num_code: 124,
      demonym_male: "Canadian",
      demonym_female: "Canadian",
      gendered_demonym: true,
      tld: ".ca",
      flag_emoji: "🇨🇦",
      calling_code: ["1"],
      continent: "North America",
    });
  });

  test("156 code returns China data", () => {
    const lookup = findCountryByUnique(156);

    expect(lookup).toMatchObject({
      common_reference: "China",
      english_clean: "China",
      formal_order: "China",
      alpha_2: "CN",
      alpha_3: "CHN",
      num_code: 156,
      demonym_male: "Chinese",
      demonym_female: "Chinese",
      gendered_demonym: true,
      tld: ".cn",
      flag_emoji: "🇨🇳",
      calling_code: ["86"],
      continent: "Asia",
    });
  });

  test("840 code returns US data", () => {
    const lookup = findCountryByUnique(840);

    expect(lookup).toMatchObject({
      common_reference: "United States of America",
      english_clean: "United States of America",
      formal_order: "United States of America",
      alpha_2: "US",
      alpha_3: "USA",
      num_code: 840,
      demonym_male: "American",
      demonym_female: "American",
      gendered_demonym: true,
      tld: ".us",
      flag_emoji: "🇺🇸",
      calling_code: ["1"],
      continent: "North America",
    });
  });

  test("76 code returns Brazil data", () => {
    const lookup = findCountryByUnique(76);

    expect(lookup).toMatchObject({
      common_reference: "Brazil",
      english_clean: "Brazil",
      formal_order: "Brazil",
      alpha_2: "BR",
      alpha_3: "BRA",
      num_code: 76,
      demonym_male: "Brazilian",
      demonym_female: "Brazilian",
      gendered_demonym: true,
      tld: ".br",
      flag_emoji: "🇧🇷",
      calling_code: ["55"],
      continent: "South America",
    });
  });
});
