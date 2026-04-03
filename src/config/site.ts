import { GITHUB_USERNAME as _GH_USER, USER } from "@/features/portfolio/data";
import type { NavItem } from "@/types/nav";

const FALLBACK_SITE_URL = "https://portfolio.dev";
const SITE_URL = (USER.website?.trim() || FALLBACK_SITE_URL).replace(/\/$/, "");
const OG_IMAGE_PATH = USER.ogImage?.trim() || "/images/og.png";

const toAbsoluteUrl = (path: string) =>
  /^https?:\/\//.test(path)
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const OG_IMAGE = toAbsoluteUrl(OG_IMAGE_PATH);

const UTM_SOURCE = (() => {
  try {
    return new URL(SITE_URL).hostname.replace(/^www\./, "");
  } catch {
    return "portfolio";
  }
})();

export const SITE_INFO = {
  name: USER.displayName,
  url: SITE_URL,
  ogImage: OG_IMAGE,
  description: USER.bio,
  keywords: USER.keywords,
};

export const PROFILE_IMAGES = {
  light: "/images/image2.jpg",
  dark: "/images/image.jpg",
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Skills",
    href: "/skills",
  },
];

export const GITHUB_USERNAME = _GH_USER;
export const SOURCE_CODE_GITHUB_REPO = `${GITHUB_USERNAME}/portfolio`;
export const SOURCE_CODE_GITHUB_URL = `https://github.com/${SOURCE_CODE_GITHUB_REPO}`;

export const UTM_PARAMS = {
  utm_source: UTM_SOURCE,
  utm_medium: "referral",
  utm_campaign: "portfolio",
};

export const siteConfig = {
  ogImage: OG_IMAGE,
};
