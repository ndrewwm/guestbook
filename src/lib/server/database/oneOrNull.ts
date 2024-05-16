export function oneOrNull(values: any[]) {
  if (values.length !== 1) {
    return null;
  }
  return values[0]!;
}
