"use client";

import { ClockCircleIcon } from "@solar-icons/react/linear/clock-circle";
import { useEffect, useState } from "react";

export function ProfileLocalTime({
  location,
  timeZone,
}: {
  location: string;
  timeZone: string;
}) {
  const [localTime, setLocalTime] = useState<string>();

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const update = () => setLocalTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return (
    <div className="flex w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-portfolio-panel px-4 py-2 text-sm">
      <span className="inline-flex items-center gap-2 font-medium">
        <span aria-hidden className="size-2 rounded-full bg-muted-foreground" />
        {location}
      </span>
      <span className="inline-flex items-center gap-2 text-muted-foreground tabular-nums">
        <ClockCircleIcon aria-hidden className="size-4" />
        <span
          aria-label={
            localTime ? `Local time in ${location}: ${localTime}` : undefined
          }
        >
          {localTime ?? "–:––"}
        </span>
      </span>
    </div>
  );
}
