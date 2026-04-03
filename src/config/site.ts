import { GITHUB_USERNAME as _GH_USER, USER } from "@/features/portfolio/data";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: "https://dakshyadav.com",
  ogImage: "https://www.dakshyadav.com/images/preview-card-dark.png", // Changed from USER.ogImage
  description: USER.bio,
  keywords: USER.keywords,
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

export const GITHUB_USERNAME = "dakshydv";
export const SOURCE_CODE_GITHUB_REPO = "dakshydv/portfolio";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/dakshydv/portfolio";

export const UTM_PARAMS = {
  utm_source: "dakshyadav.com",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};

export const siteConfig = {
  ogImage: "https://www.dakshyadav.com/images/preview-card-dark.png", // Changed to absolute URL
};
