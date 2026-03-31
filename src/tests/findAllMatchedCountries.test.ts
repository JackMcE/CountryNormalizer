import { findAllMatchedCountries } from "../findAllMatchedCountries";
import { map } from "lodash";

describe("findAllMatchedCountries() number based inputs", () => {
  test("1 for calling code lookup gives back three results", () => {
    const lookup = findAllMatchedCountries(1);

    expect(lookup.length).toBe(3);
    expect(Array.isArray(lookup)).toBe(true);

    const pickedAlpha2s = map(lookup, "alpha_2");

    expect(pickedAlpha2s.includes("UM")).toBe(true);
    expect(pickedAlpha2s.includes("US")).toBe(true);
    expect(pickedAlpha2s.includes("CA")).toBe(true);
  });

  test("804 lookup yeidls Ukraine", () => {
    const lookup = findAllMatchedCountries(804);

    expect(lookup.length).toBe(1);
    expect(Array.isArray(lookup)).toBe(true);

    const ukraineBase = {
      common_reference: "Ukraine",
      english_clean: "Ukraine",
      formal_order: "Ukraine",
      alpha_2: "UA",
      alpha_3: "UKR",
      num_code: 804,
      demonym_male: "Ukrainian",
      demonym_female: "Ukrainian",
      gendered_demonym: false,
      official_languages: ["uk"],
      lang_defacto: false,
      tld: ".ua",
      flag_emoji: "🇺🇦",
      calling_code: ["380"],
      continent: "Europe",
    } as const;

    expect(lookup[0]).toMatchObject(ukraineBase);
  });
});

describe("String based input tests for findAllMatchedCountries()", () => {
  test("Antarctica search gives 5 items", () => {
    const lookup = findAllMatchedCountries("Antarctica");

    expect(lookup.length).toBe(5);

    const pickedAlpha2s = map(lookup, "alpha_3");

    expect(pickedAlpha2s.includes("ATA")).toBe(true);
    expect(pickedAlpha2s.includes("BVT")).toBe(true);
    expect(pickedAlpha2s.includes("HMD")).toBe(true);
    expect(pickedAlpha2s.includes("SGS")).toBe(true);
    expect(pickedAlpha2s.includes("SJM")).toBe(true);
  });

  test("UAE gives back United Arab Emirates", () => {
    const lookup = findAllMatchedCountries("UAE");

    expect(lookup.length).toBe(1);
    expect(lookup[0]?.english_clean).toBe("United Arab Emirates");
  });

  test("clean_english Congo, Democratic Republic of the gives back Congolese", () => {
    const lookup = findAllMatchedCountries("Congo, Democratic Republic of the");

    expect(lookup.length).toBe(1);
    expect(lookup[0]?.demonym_male).toBe("Congolese");
    expect(lookup[0]?.demonym_female).toBe("Congolese");
  });

  test("formal_order Kingdom of the Netherlands gives back entire country object", () => {
    const lookup = findAllMatchedCountries("Kingdom of the Netherlands");

    const netherlandsBaseData = {
      common_reference: "Netherlands",
      english_clean: "Netherlands, Kingdom of the",
      formal_order: "Kingdom of the Netherlands",
      alpha_2: "NL",
      alpha_3: "NLD",
      num_code: 528,
      demonym_male: "Dutch",
      demonym_female: "Dutch",
      gendered_demonym: false,
      official_languages: ["nl"],
      lang_defacto: false,
      tld: ".nl",
      flag_emoji: "🇳🇱",
      calling_code: ["31"],
      continent: "Europe",
    };

    expect(lookup.length).toBe(1);
    expect(lookup[0]).toMatchObject(netherlandsBaseData);
  });

  test("Congolese demonym search returns two instances", () => {
    const lookup = findAllMatchedCountries("Congolese");

    expect(lookup.length).toBe(2);
    expect(lookup[0]?.num_code).toBe(180);
    expect(lookup[0]?.demonym_male).toBe("Congolese");
    expect(lookup[0]?.demonym_female).toBe("Congolese");

    expect(lookup[1]?.num_code).toBe(178);
    expect(lookup[1]?.demonym_male).toBe("Congolese");
    expect(lookup[1]?.demonym_female).toBe("Congolese");
  });

  test("alpha_2 JP returns Japan", () => {
    const lookup = findAllMatchedCountries("JP");

    expect(lookup.length).toBe(1);
    expect(lookup[0]?.common_reference).toBe("Japan");
  });

  test("alpha_3 SJM returns Svalbard and Jan Mayen", () => {
    const lookup = findAllMatchedCountries("SJM");

    expect(lookup.length).toBe(1);
    expect(lookup[0]?.common_reference).toBe("Svalbard and Jan Mayen");
  });

  test("Mexico flag (🇲🇽) returns Mexico", () => {
    const lookup = findAllMatchedCountries("🇲🇽");

    expect(lookup.length).toBe(1);
    expect(lookup[0]?.common_reference).toBe("Mexico");
  });

  test("Search for en language key gives many countries back", () => {
    const lookup = findAllMatchedCountries("en");

    expect(lookup.length).toBe(90);
  });

  test("TLD .za returns South Africa", () => {
    const lookup = findAllMatchedCountries(".za");

    expect(lookup[0]?.formal_order).toBe("South Africa");
  });
});
