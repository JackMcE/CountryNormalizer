import { getContactFieldsByAlpha2 } from "../getCountryContactData";

describe("contact fields lookup testing", () => {
  test("Valid alpha 2 returns contact fields", () => {
    const lookup = getContactFieldsByAlpha2("GM");

    console.log(lookup);

    expect(lookup?.tld).toBe(".gm");
    expect(lookup?.flag_emoji).toBe("🇬🇲");
    expect(Array.isArray(lookup?.calling_code)).toBe(true);
    expect(lookup?.calling_code[0]).toBe("220");
  });

  test("Invalid alpha 2 returns null", () => {
    const lookup = getContactFieldsByAlpha2("AN");

    expect(lookup).toBe(null);
  });
});
