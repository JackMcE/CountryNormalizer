import { findCountryByUnique } from "../findCountryByUnqiue";

describe("flag search inputs yeild expected countries", () => {
  test("Angola flag search yeilds Angola data", () => {
    const lookup = findCountryByUnique("🇦🇴");

    expect(lookup?.english_clean).toBe("Angola");
  });

  test("Antigua & Barbuda flag search yeilds Antigua & Barbuda data", () => {
    const lookup = findCountryByUnique("🇦🇬");

    expect(lookup?.alpha_2).toBe("AG");
  });

  test("United Arab Emirates flag yeilds UAE data", () => {
    const lookup = findCountryByUnique("🇦🇪");

    expect(lookup?.alpha_3).toBe("ARE");
  });

  test("Andorra flag search yeilds Andorra data", () => {
    const lookup = findCountryByUnique("🇦🇩");

    expect(lookup?.num_code).toBe(20);
  });

  test("Ascension Island flag search yeilds Ascension Island data", () => {
    const lookup = findCountryByUnique("🇸🇭");

    expect(lookup?.tld).toBe(".sh");
  });
});

describe("Non flag emoji inputs", () => {
  test("Smile emoji returns null result", () => {
    const lookup = findCountryByUnique("😀");

    expect(lookup).toBe(null);
  });
});
