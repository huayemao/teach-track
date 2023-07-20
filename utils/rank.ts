export function rank<T extends object>(
  list: T[],
  key: keyof T,
  targetKey: string
): T[] {
  list.sort((a, b) => b[key] - a[key]);

  let currentRank = 1;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    /* @ts-ignore */
    item[targetKey] = currentRank;
    if (i < list.length - 1 && item[key] === list[i + 1][key]) {
      continue;
    }
    currentRank++;
  }

  return list;
}
