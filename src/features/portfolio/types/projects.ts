export type ProjectLink = {
  type: "github" | "website" | "post";
  href: string;
  label?: string;
};

export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period?: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (site, repository, demo, or video). */
  liveLink?: string;
  githubLink?: string;
  image?: string;
  video?: string;
  pinned?: boolean;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
  /** Optional project status for UI (e.g., 'live', 'building'). */
  status?: string;
  /** Optional project category for UI (e.g., 'Mobile App', 'Dashboard'). */
  category?: string;
  /** Typed links: github, website, post etc. */
  links?: ProjectLink[];
};

