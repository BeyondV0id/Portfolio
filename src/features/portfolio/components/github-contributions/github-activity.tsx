"use client";

import { AltArrowDownIcon } from "@solar-icons/react/linear/alt-arrow-down";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

import { Icons } from "@/components/icons";
import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { cn } from "@/lib/utils";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type RepoContribution = {
  name: string;
  count: number;
  logo?: React.ReactNode;
  href?: string;
};

const DEFAULT_ACCENT = "var(--contribution-4)";
const DEFAULT_CELL_SIZE = 11;
const DEFAULT_LABEL = "Top contributions";
const DEFAULT_MONTHS = 12;
const WEEKS_PER_MONTH = 365.25 / 12 / 7;
const STACK_LIMIT = 3;
const MIN_CARD_WIDTH = 320;
const MIN_LABEL_WEEKS = 3;
// Outer padding plus the calendar inset, on both sides.
const CARD_PADDING = 32;

const gapFor = (cellSize: number) => Math.max(2, Math.round(cellSize / 4));
// never zero: weeks.slice(-0) would hand back the whole history instead of nothing
const weeksFor = (months: number) =>
  Math.max(1, Math.ceil(months * WEEKS_PER_MONTH));

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const PANEL_TRANSITION = { duration: 0.2, ease: EASE_OUT } as const;
const CELL_FADE = { duration: 0.2, ease: EASE_OUT } as const;
const TOOLTIP_FADE = { duration: 0.14, ease: EASE_OUT } as const;
const TOOLTIP_EDGE = 8;
const COLUMN_STAGGER = 0.012;
const LABEL_BLUR = 6;
const LABEL_REVEAL = { duration: 0.45, ease: EASE_OUT } as const;

const LEVELS = [0, 1, 2, 3, 4] as const;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toMonthLabels(weeks: Contribution[][]) {
  const labels: (string | null)[] = weeks.map(() => null);
  const monthAt = (index: number) => weeks[index]?.[0]?.date.slice(5, 7);

  let start = 0;
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue;
    // a shorter run is narrower than the label itself, so it would sit under the next month
    if (i - start >= MIN_LABEL_WEEKS) {
      labels[start] = MONTH_NAMES[Number(monthAt(start)) - 1] ?? null;
    }
    start = i;
  }

  return labels;
}

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
};

type LevelStyle = { backgroundColor: string; opacity: number };

type HoveredDay = { day: Contribution; x: number; y: number };

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function describeDay({ count, date }: Contribution) {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`;
}

const CALENDAR_API = "https://github-contributions-api.jogruber.de/v4";
const EVENTS_API = "https://api.github.com/users";

type ApiDay = { date: string; count: number; level: number };
type PushEvent = {
  type: string;
  repo?: { name: string };
  payload?: { commits?: unknown[] };
};

async function fetchCalendar(login: string) {
  const res = await fetch(`${CALENDAR_API}/${login}?y=last`);
  if (!res.ok) return null;

  const days: ApiDay[] =
    ((await res.json()) as { contributions?: ApiDay[] })?.contributions ?? [];
  if (!days.length) return null;

  // columns are weeks, so the first day has to be a sunday or every column shears
  const start = days.findIndex(
    (day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0,
  );

  return days.slice(start < 0 ? 0 : start).map<Contribution>((day) => ({
    date: day.date,
    count: day.count,
    level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
  }));
}

async function fetchRepos(login: string): Promise<RepoContribution[]> {
  const res = await fetch(`${EVENTS_API}/${login}/events/public?per_page=100`);
  if (!res.ok) return [];

  const events: PushEvent[] = (await res.json()) as PushEvent[];
  const counts = new Map<string, number>();

  for (const event of events) {
    if (event.type !== "PushEvent" || !event.repo) continue;
    const commits = event.payload?.commits?.length ?? 1;
    counts.set(event.repo.name, (counts.get(event.repo.name) ?? 0) + commits);
  }

  return [...counts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, STACK_LIMIT)
    .map(([fullName, count]) => {
      const [owner, name] = fullName.split("/");
      return {
        name,
        count,
        href: `https://github.com/${fullName}`,
        // github has no repo logo, only an owner avatar, so own repos use the initial
        logo:
          owner.toLowerCase() === login.toLowerCase() ? undefined : (
            <img src={`https://github.com/${owner}.png?size=64`} alt="" />
          ),
      };
    });
}

function useGitHubUser(login?: string) {
  const [data, setData] = React.useState<{
    contributions: Contribution[];
    repos: RepoContribution[];
  }>();

  React.useEffect(() => {
    if (!login) return;
    let active = true;

    Promise.all([fetchCalendar(login), fetchRepos(login)])
      .then(([contributions, repos]) => {
        if (active && contributions) setData({ contributions, repos });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [login]);

  return data;
}

function emptyDays(weeks: number): Contribution[] {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0 as ContributionLevel,
    };
  });
}

function toScale(accent: string | string[]): LevelStyle[] {
  if (typeof accent === "string") {
    return LEVELS.map((level) => ({
      backgroundColor: accent,
      opacity: LEVEL_OPACITY[level],
    }));
  }

  const colors = accent.length > 4 ? accent : ["transparent", ...accent];
  return LEVELS.map((level) => {
    const color = colors[level] ?? colors.at(-1) ?? "transparent";
    return { backgroundColor: color, opacity: color === "transparent" ? 0 : 1 };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

function useFittedColumns(cellSize: number, gap: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [columns, setColumns] = React.useState<number>();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () =>
      setColumns(
        Math.max(1, Math.floor((el.clientWidth + gap) / (cellSize + gap))),
      );

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cellSize, gap]);

  return [ref, columns] as const;
}

const Tooltip = ({
  hovered,
  reduceMotion,
}: {
  hovered: HoveredDay;
  reduceMotion: boolean | null;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [left, setLeft] = React.useState(hovered.x);

  useIsoLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2;
    const edge = TOOLTIP_EDGE + half;
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge));
  }, [hovered]);

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left,
        top: hovered.y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <motion.div
        ref={ref}
        className="whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-[11px] font-medium text-background shadow-md"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={reduceMotion ? { duration: 0 } : TOOLTIP_FADE}
      >
        {describeDay(hovered.day)}
      </motion.div>
    </div>,
    document.body,
  );
};

const ContributionGrid = ({
  contributions,
  scale,
  cellSize,
  months,
  showMonths,
  label,
  reduceMotion,
}: {
  contributions: Contribution[];
  scale: LevelStyle[];
  cellSize: number;
  months: number;
  showMonths: boolean;
  label: string;
  reduceMotion: boolean | null;
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions]);
  const gap = gapFor(cellSize);
  const [ref, columns] = useFittedColumns(cellSize, gap);
  const [hovered, setHovered] = React.useState<HoveredDay>();

  const cap = Math.min(weeks.length, weeksFor(months));
  const visible = weeks.slice(-Math.min(cap, columns ?? cap));
  const sweepEnd = (visible.length - 1) * COLUMN_STAGGER + CELL_FADE.duration;

  const hover = (day: Contribution) => (event: React.PointerEvent) => {
    const cell = event.currentTarget.getBoundingClientRect();
    setHovered({ day, x: cell.left + cell.width / 2, y: cell.top });
  };

  return (
    <div
      ref={ref}
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="relative"
    >
      {showMonths && (
        <motion.div
          className="flex justify-center"
          style={{ gap, marginBottom: gap }}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, filter: `blur(${LABEL_BLUR}px)` }
          }
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            ...LABEL_REVEAL,
            delay: reduceMotion ? 0 : sweepEnd,
          }}
        >
          {toMonthLabels(visible).map((month, index) => (
            <div
              key={index}
              className="relative h-3 shrink-0"
              style={{ width: cellSize }}
            >
              {month && (
                <span className="absolute left-0 top-0 text-[10px] leading-none text-muted-foreground">
                  {month}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      )}

      <div
        className="flex justify-center overflow-hidden"
        style={{ gap }}
        onPointerLeave={() => setHovered(undefined)}
      >
        {visible.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col" style={{ gap }}>
            {week.map((day) => (
              <motion.div
                key={day.date}
                onPointerEnter={hover(day)}
                className="shrink-0 rounded-full bg-foreground/8"
                style={{ width: cellSize, height: cellSize }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ...CELL_FADE,
                  delay: reduceMotion ? 0 : weekIndex * COLUMN_STAGGER,
                }}
              >
                <div
                  className="size-full rounded-full"
                  style={scale[day.level] ?? scale[0]}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {hovered && (
          <Tooltip
            key="tooltip"
            hovered={hovered}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Avatar = ({
  repo,
  className,
}: {
  repo: RepoContribution;
  className?: string;
}) => (
  <span
    aria-hidden="true"
    className={cn(
      "grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-[11px] font-medium uppercase text-muted-foreground",
      "[&_img]:size-full [&_img]:object-cover [&_svg]:size-full",
      className,
    )}
  >
    {repo.logo ?? repo.name.charAt(0)}
  </span>
);

const RepoRow = ({ repo }: { repo: RepoContribution }) => {
  const className = "flex items-center gap-3 rounded-lg px-2 py-2";

  const content = (
    <>
      <Avatar repo={repo} />
      <span className="flex-1 truncate text-sm text-foreground">
        {repo.name}
      </span>
      <span className="text-sm text-muted-foreground tabular-nums">
        {repo.count}
      </span>
    </>
  );

  return repo.href ? (
    <a
      href={repo.href}
      target="_blank"
      rel="noreferrer"
      data-fluid-item
      className={cn(
        className,
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
      )}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

export type GitHubActivityProps = React.ComponentProps<"div"> & {
  username?: string;
  contributions?: Contribution[];
  repos?: RepoContribution[];
  year?: number;
  accent?: string | string[];
  cellSize?: number;
  months?: number;
  showMonths?: boolean;
  label?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const GitHubActivity = ({
  className,
  username,
  contributions: contributionsProp,
  repos: reposProp,
  year,
  accent = DEFAULT_ACCENT,
  cellSize = DEFAULT_CELL_SIZE,
  months = DEFAULT_MONTHS,
  showMonths = false,
  label = DEFAULT_LABEL,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  style,
  ...props
}: GitHubActivityProps) => {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const [openState, setOpenState] = React.useState(defaultOpen);

  const open = openProp ?? openState;
  const toggle = () => {
    if (openProp === undefined) setOpenState(!open);
    onOpenChange?.(!open);
  };

  const needsFetch = contributionsProp === undefined || reposProp === undefined;
  const fetched = useGitHubUser(needsFetch ? username : undefined);
  const placeholder = React.useMemo(
    () => (needsFetch && username ? emptyDays(weeksFor(months)) : []),
    [needsFetch, username, months],
  );

  const contributions =
    contributionsProp ?? fetched?.contributions ?? placeholder;
  const repos = reposProp ?? fetched?.repos ?? [];

  const scale = React.useMemo(() => toScale(accent), [accent]);

  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions],
  );

  const heading = `${new Intl.NumberFormat("en-US").format(total)} ${total === 1 ? "contribution" : "contributions"} ${year ? `in ${year}` : "in the past year"}`;

  const gap = gapFor(cellSize);
  const columns = Math.min(
    Math.ceil(contributions.length / 7),
    weeksFor(months),
  );
  const width = Math.max(
    MIN_CARD_WIDTH,
    columns * (cellSize + gap) - gap + CARD_PADDING,
  );

  return (
    <div
      data-slot="github-activity"
      className={cn(
        "flex max-w-full flex-col overflow-hidden rounded-2xl bg-portfolio-panel p-1",
        className,
      )}
      style={{ width, ...style }}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2 px-3 py-2 text-sm">
        <Icons.github aria-hidden="true" className="size-4 shrink-0" />
        <span className="font-semibold">GitHub</span>
        {username && (
          <FluidHoverGroup
            className="min-w-0"
            highlightClassName="rounded-md bg-accent"
          >
            <a
              href={`https://github.com/${encodeURIComponent(username)}`}
              data-fluid-item
              className="block truncate rounded-md px-1 py-0.5 leading-none text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring data-[fluid-hover-active]:text-foreground"
            >
              @{username}
            </a>
          </FluidHoverGroup>
        )}
      </div>

      <div className="rounded-xl bg-card px-3 py-2 dark:bg-background">
        <ContributionGrid
          contributions={contributions}
          scale={scale}
          cellSize={cellSize}
          months={months}
          showMonths={showMonths}
          label={`GitHub contributions calendar. ${heading}`}
          reduceMotion={reduceMotion}
        />

        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] leading-4 text-muted-foreground">
          <div className="flex items-center gap-1" aria-hidden="true">
            Less
            {scale.map((style, index) => (
              <span
                key={index}
                className="size-2.5 rounded-full bg-foreground/8"
              >
                <span className="block size-full rounded-full" style={style} />
              </span>
            ))}
            More
          </div>
          <p className="tabular-nums">{heading}</p>
        </div>
      </div>

      {repos.length > 0 && (
        <FluidHoverGroup
          className="mt-1"
          highlightClassName="rounded-xl bg-accent"
        >
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={`${uid}-panel`}
            data-slot="github-activity-panel"
            data-state={open ? "open" : "closed"}
            data-fluid-item
            className="group flex min-h-10 w-full items-center justify-between gap-2 rounded-xl px-3 py-1 text-left text-sm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
          >
            <span className="truncate">{label}</span>
            <span className="flex items-center gap-3" aria-hidden="true">
              {!open && (
                <span className="flex items-center">
                  {repos.slice(0, STACK_LIMIT).map((repo, index) => (
                    <Avatar
                      key={index}
                      repo={repo}
                      className="-ml-2 ring-2 ring-muted first:ml-0 dark:ring-surface"
                    />
                  ))}
                </span>
              )}
              <AltArrowDownIcon className="size-4 shrink-0 text-muted-foreground group-aria-expanded:rotate-180 motion-safe:transition-transform" />
            </span>
          </button>
        </FluidHoverGroup>
      )}

      <div id={`${uid}-panel`} inert={!open}>
        <AnimatePresence initial={false}>
          {open && repos.length > 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={reduceMotion ? { duration: 0 } : PANEL_TRANSITION}
              className="overflow-hidden"
            >
              <FluidHoverGroup
                className="mt-1 rounded-xl bg-card p-1 dark:bg-background"
                highlightClassName="bg-accent"
              >
                <ul>
                  {repos.map((repo, index) => (
                    <li key={index}>
                      <RepoRow repo={repo} />
                    </li>
                  ))}
                </ul>
              </FluidHoverGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { GitHubActivity };
export default GitHubActivity;
