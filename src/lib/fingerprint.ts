const FINGERPRINT_KEY = "visitor-fingerprint";

function createFingerprint() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateVisitorId() {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem(FINGERPRINT_KEY);
  if (existing) return existing;

  const created = createFingerprint();
  window.localStorage.setItem(FINGERPRINT_KEY, created);
  return created;
}
