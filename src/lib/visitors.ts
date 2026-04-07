import { createHash } from "node:crypto";

type VisitorStore = {
  visitors: Set<string>;
  totalVisits: number;
};

type VisitorStats = {
  uniqueVisitors: number;
  totalVisits: number;
};

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KV_UNIQUE_SET_KEY = "visitors:unique:set";
const KV_TOTAL_KEY = "visitors:total";

declare global {
  // eslint-disable-next-line no-var
  var __visitorStore__: VisitorStore | undefined;
}

function getVisitorStore(): VisitorStore {
  if (!global.__visitorStore__) {
    global.__visitorStore__ = {
      visitors: new Set<string>(),
      totalVisits: 0,
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

function hasKVConfig() {
  return Boolean(KV_URL && KV_TOKEN);
}

async function kvCommand<T>(command: string, args: string[]) {
  if (!KV_URL || !KV_TOKEN) {
    throw new Error("KV is not configured");
  }

  const encodedArgs = args.map((arg) => encodeURIComponent(arg));
  const url = `${KV_URL}/${command}/${encodedArgs.join("/")}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`KV command failed: ${command}`);
  }

  const payload = (await response.json()) as { result?: T };
  return payload.result;
}

async function trackVisitInKV(visitorId: string): Promise<VisitorStats> {
  const totalVisits = Number(await kvCommand<number>("incr", [KV_TOTAL_KEY]));

  await kvCommand<number>("sadd", [KV_UNIQUE_SET_KEY, visitorId]);
  const uniqueVisitors = Number(
    await kvCommand<number>("scard", [KV_UNIQUE_SET_KEY]),
  );

  return {
    uniqueVisitors: Number.isFinite(uniqueVisitors) ? uniqueVisitors : 0,
    totalVisits: Number.isFinite(totalVisits) ? totalVisits : 0,
  };
}

function trackVisitInMemory(visitorId: string): VisitorStats {
  const store = getVisitorStore();
  store.visitors.add(visitorId);
  store.totalVisits += 1;

  return {
    uniqueVisitors: store.visitors.size,
    totalVisits: store.totalVisits,
  };
}

async function getStatsFromKV(): Promise<VisitorStats> {
  const uniqueVisitors = Number(
    await kvCommand<number>("scard", [KV_UNIQUE_SET_KEY]),
  );
  const rawTotal = await kvCommand<string | number | null>("get", [
    KV_TOTAL_KEY,
  ]);
  const totalVisits = Number(rawTotal ?? 0);

  return {
    uniqueVisitors: Number.isFinite(uniqueVisitors) ? uniqueVisitors : 0,
    totalVisits: Number.isFinite(totalVisits) ? totalVisits : 0,
  };
}

function getStatsFromMemory(): VisitorStats {
  const store = getVisitorStore();

  return {
    uniqueVisitors: store.visitors.size,
    totalVisits: store.totalVisits,
  };
}

export async function trackVisit(visitorId: string): Promise<VisitorStats> {
  if (hasKVConfig()) {
    try {
      return await trackVisitInKV(visitorId);
    } catch {
      return trackVisitInMemory(visitorId);
    }
  }

  return trackVisitInMemory(visitorId);
}

export async function getVisitorStats(): Promise<VisitorStats> {
  if (hasKVConfig()) {
    try {
      return await getStatsFromKV();
    } catch {
      return getStatsFromMemory();
    }
  }

  return getStatsFromMemory();
}
