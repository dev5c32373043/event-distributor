export function all(possibleDestinations) {
  const { included } = possibleDestinations.reduce(
    (acc, destination) => {
      for (const key in destination) {
        if (acc.excluded.has(key)) {
          continue;
        }

        const value = destination[key];

        if (value && !acc.included.has(key)) {
          acc.included.add(key);
        }

        if (!value) {
          acc.excluded.add(key);
          acc.included.delete(key);
        }
      }

      return acc;
    },
    { included: new Set([]), excluded: new Set([]) }
  );

  return Array.from(included);
}
