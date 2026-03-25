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
});
