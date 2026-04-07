import { createHash } from "node:crypto";

type VisitorStore = {
  visitors: Set<string>;
};

declare global {
  // eslint-disable-next-line no-var
  var __visitorStore__: VisitorStore | undefined;
}

function getVisitorStore(): VisitorStore {
  if (!global.__visitorStore__) {
    global.__visitorStore__ = {
      visitors: new Set<string>(),
    };
  }

  return global.__visitorStore__;
}

export function generateVisitorId(
  ip: string | null,
  userAgent: string | null,
  fingerprint?: string,
) {
  const raw = [ip ?? "", userAgent ?? "", fingerprint ?? ""]
    .join("|")
    .toLowerCase();

  return createHash("sha256").update(raw).digest("hex");
}

export async function trackVisit(visitorId: string) {
  const store = getVisitorStore();
  store.visitors.add(visitorId);

  return {
    uniqueVisitors: store.visitors.size,
  };
}

export async function getVisitorStats() {
  const store = getVisitorStore();

  return {
    uniqueVisitors: store.visitors.size,
  };
}
