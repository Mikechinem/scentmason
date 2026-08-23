import type { BrowserIdentifiers } from "./types";

function getCookie(
  name: string
): string | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  const row = document.cookie
    .split("; ")
    .find(
      (item) =>
        item.startsWith(`${name}=`)
    );

  if (!row) {
    return undefined;
  }

  const value =
    row.slice(name.length + 1);

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function getBrowserIdentifiers(): BrowserIdentifiers {
  if (typeof document === "undefined") {
    return {};
  }

  return {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    ttp: getCookie("_ttp"),
  };
}

export function getCookieValue(
  name: string
): string | undefined {
  return getCookie(name);
}