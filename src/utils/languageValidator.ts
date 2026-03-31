/**
 * Validates if a given language matches any of the country's languages.
 *
 * @param langSearch - The language to search for.
 * @param countryLangs - The list of languages supported by the country.
 * @returns `true` if a match is found, `false` otherwise.
 */
export const hasMatchingLanguage = (
  langSearch: string,
  countryLangs: string[],
): boolean => {
  const cleanedLang = langSearch.toLowerCase().trim();

  return countryLangs.includes(cleanedLang);
};
