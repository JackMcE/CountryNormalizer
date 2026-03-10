export const hasMatchingCallingCode = (
  searchKey: string | number,
  callingCodes: string[],
): boolean => {
  const cleanSearchKey = String(searchKey)
    .toLowerCase()
    .replace(/[^0-9]/g, "");

  // An empty string of "" which comes from nothing being left after a replace is falsey.
  if (!cleanSearchKey) return false;

  for (const code of callingCodes) {
    const cleanCode = String(code).replace(/[^0-9]/g, "");
    if (cleanCode === cleanSearchKey) return true;
  }

  return false;
};
