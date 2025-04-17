export function entriesWithType<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
