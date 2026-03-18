/*
  Edge case testing of the findCOuntryByUnique function.
  Validates error cases, mixed casing inputs, etc.
*/
import { findCountryByUnique } from "../findCountryByUnqiue";

describe("Test too long and too short inputs of findCountryByUnique()", () => {
  test("String less than two in length returns null", () => {
    const lookup = findCountryByUnique("a");

    expect(lookup).toBe(null);
  });

  test("Entering a very long string returns null", () => {
    const lookup = findCountryByUnique(
      "QWXdfant6ZY7Y6eM7F4LVWT56Rx4tWLDc4D5r2kakiGkVqW2nvAvHrEvbSxSUkTNyrwvFPEVx2vkQbkr",
    );

    expect(lookup).toBe(null);
  });
});
