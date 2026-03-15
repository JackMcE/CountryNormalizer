import { hasMatchingCallingCode } from "../utils/callingCodesValidator";
import type { ContactCountryFields } from "../../types/core";
import allContactFieldsData from "../../data/contactFields.json";

const allContactFields = allContactFieldsData as Record<
  string,
  ContactCountryFields
>;

describe("valid calling code lookups", () => {
  test("String number input is valid test against US", () => {
    const isValid = hasMatchingCallingCode(
      "1",
      allContactFields.US?.calling_code as string[],
    );

    expect(isValid).toBe(true);
  });

  test("Number input 380 is valid for UA", () => {
    const isValid = hasMatchingCallingCode(
      380,
      allContactFields.UA?.calling_code as string[],
    );

    expect(isValid).toBe(true);
  });
});

describe("Test invalid calling code lookups", () => {
  test("Number input 380 is invalid for US", () => {
    const isValid = hasMatchingCallingCode(
      380,
      allContactFields.US?.calling_code as string[],
    );

    expect(isValid).toBe(false);
  });

  test("Long random string yeilds false result", () => {
    const isValid = hasMatchingCallingCode(
      "fdrjnginu89g",
      allContactFields.US?.calling_code as string[],
    );

    expect(isValid).toBe(false);
  });

  test("Empty string input yeilds false result", () => {
    const isValid = hasMatchingCallingCode(
      "",
      allContactFields.US?.calling_code as string[],
    );

    expect(isValid).toBe(false);
  });
});
