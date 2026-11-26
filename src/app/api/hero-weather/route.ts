import { z } from "zod";

import { weatherSchema } from "@/features/portfolio/components/hero-scene-weather";

const forecastSchema = z.object({ current: weatherSchema });

function readCoordinate(value: string | null, limit: number) {
  if (!value?.trim()) return null;
  const coordinate = Number(value);
  return Number.isFinite(coordinate) && Math.abs(coordinate) <= limit
    ? coordinate.toFixed(1)
    : null;
}

export async function GET(request: Request) {
  const latitude = readCoordinate(
    request.headers.get("x-vercel-ip-latitude"),
    90,
  );
  const longitude = readCoordinate(
    request.headers.get("x-vercel-ip-longitude"),
    180,
  );
  const options = { headers: { "Cache-Control": "private, no-store" } };

  if (latitude === null || longitude === null) {
    return Response.json(null, options);
  }

  const forecast = new URL("https://api.open-meteo.com/v1/forecast");
  forecast.search = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,weather_code,is_day",
  }).toString();

  try {
    const response = await fetch(forecast, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      return Response.json(
        forecastSchema.parse(await response.json()).current,
        options,
      );
    }
  } catch {
    // Regional weather is optional when the upstream service is unavailable.
  }

  return Response.json(null, options);
}
