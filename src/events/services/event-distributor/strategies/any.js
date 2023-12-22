export function any(possibleDestinations) {
  const matched = possibleDestinations.reduce((acc, dest) => {
    for (const key in dest) {
      const value = dest[key];

      if (value && !acc.has(key)) {
        acc.add(key);
      }
    }

    return acc;
  }, new Set([]));

  return Array.from(matched);
}
