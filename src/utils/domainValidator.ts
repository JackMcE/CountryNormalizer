export const matchesCleanedDomain = (
  searchKey: string,
  countryDomain: string,
): boolean => {
  // COuntry domains are all 2 letters plus the leading dot/period. If it is longer than that, no chance.
  if (searchKey.length > 3) return false;

  const cleanKey = searchKey.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanDomain = countryDomain.toLowerCase().replace(/[^a-z0-9]/g, "");

  return cleanKey === cleanDomain;
};
