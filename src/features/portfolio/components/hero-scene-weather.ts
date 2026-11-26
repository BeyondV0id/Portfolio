import { z } from "zod";

export const weatherSchema = z.object({
  temperature_2m: z.number(),
  weather_code: z.number().int(),
  is_day: z.union([z.literal(0), z.literal(1)]),
});

export function getSceneConditions(code: number) {
  if (code >= 95) return "Thunderstorms";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if (code >= 51) return "Rain";
  if (code >= 45) return "Fog";
  if (code === 3) return "Overcast";
  if (code >= 1) return "Partly cloudy";
  return "Clear";
}
