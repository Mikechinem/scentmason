export function cleanString(
  value: unknown
): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const cleaned = value.trim();

  return cleaned || undefined;
}

export function normalizePhone(
  phone: unknown
): string | undefined {
  const cleaned = cleanString(phone);

  if (!cleaned) {
    return undefined;
  }

  let digits = cleaned.replace(/\D/g, "");

  if (digits.startsWith("2340")) {
    digits = `234${digits.slice(4)}`;
  } else if (digits.startsWith("0")) {
    digits = `234${digits.slice(1)}`;
  } else if (
    !digits.startsWith("234") &&
    digits.length >= 9
  ) {
    digits = `234${digits}`;
  }

  return digits || undefined;
}

export function removeEmptyValues<
  T extends Record<string, unknown>
>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        return false;
      }

      if (
        Array.isArray(value) &&
        value.length === 0
      ) {
        return false;
      }

      return true;
    })
  ) as Partial<T>;
}