import { getCountriesByContinent } from "../getCountriesByContinent";
import { ContinentNames } from "../../types/core";

/**
 * Validate that all continent inputs return some data.
 * 5 countries are grouped to the anartic regions.
 * So we wants to make sure everything is an array with at least that many countries.
 */
describe("All continents return data", () => {
  test("North America returns data", () => {
    const lookup = getCountriesByContinent(ContinentNames.NorthAmerica);

    expect(Array.isArray(lookup)).toBe(true);
    expect(lookup.length).toBeGreaterThanOrEqual(5);
  });

  test("Asia returns data", () => {
    const lookup = getCountriesByContinent(ContinentNames.Asia);

    expect(Array.isArray(lookup)).toBe(true);
    expect(lookup.length).toBeGreaterThanOrEqual(5);
  });

  test("Africa returns data", () => {
    const lookup = getCountriesByContinent(ContinentNames.Africa);

    expect(Array.isArray(lookup)).toBe(true);
    expect(lookup.length).toBeGreaterThanOrEqual(5);
  });

  test("Europe returns data", () => {
    const lookup = getCountriesByContinent(ContinentNames.Europe);

    expect(Array.isArray(lookup)).toBe(true);
    expect(lookup.length).toBeGreaterThanOrEqual(5);
  });

  test("South America returns data", () => {
    const lookup = getCountriesByContinent(ContinentNames.SouthAmerica);

    expect(Array.isArray(lookup)).toBe(true);
    expect(lookup.length).toBeGreaterThanOrEqual(5);
  });

  test("Oceania returns data", () => {
    const lookup = getCountriesByContinent(ContinentNames.Oceania);

    expect(Array.isArray(lookup)).toBe(true);
    expect(lookup.length).toBeGreaterThanOrEqual(5);
  });

  test("Antarctica returns data", () => {
    const lookup = getCountriesByContinent(ContinentNames.Antarctica);

    expect(Array.isArray(lookup)).toBe(true);
    expect(lookup.length).toBeGreaterThanOrEqual(5);
  });
});

describe("Check fields on countries returned", () => {
  test("Aruba is first NA country and has all data", () => {
    const lookup = getCountriesByContinent(ContinentNames.NorthAmerica);

    const arubaData = lookup[0];

    expect(arubaData?.english_clean).toBe("Aruba");
    expect(arubaData?.formal_order).toBe("Aruba");
    expect(arubaData?.alpha_2).toBe("AW");
    expect(arubaData?.alpha_3).toBe("ABW");
    expect(arubaData?.num_code).toBe(533);
    expect(arubaData?.tld).toBe(".aw");
    expect(arubaData?.flag_emoji).toBe("🇦🇼");
  });
});
