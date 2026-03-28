/**
 * Central profile loader.
 *
 * Set ACTIVE_PROFILE to the filename (without .json) of a profile
 * inside `./profiles/` to switch all portfolio data at once.
 *
 * Current options: "harsha" | "daksh"
 */

import type { OssContributions } from "../types/contributions";
import type { Experience } from "../types/experiences";
import type { Project } from "../types/projects";
import type { SocialLink } from "../types/social-links";
import type { TechStack } from "../types/tech-stack";
import type { User } from "../types/user";

// --- Change this value to switch persona ---
const ACTIVE_PROFILE = "sai";
// -------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-require-imports
const profileData = require(`./users/${ACTIVE_PROFILE}.json`);

export const USER: User = profileData.profile;
export const EXPERIENCES: Experience[] = profileData.experiences;
export const PROJECTS: Project[] = profileData.projects;
export const TECH_STACK: TechStack[] = profileData.techStack;
export const SOCIAL_LINKS: SocialLink[] = profileData.socialLinks;
export const OSSContributions: OssContributions[] =
  profileData.ossContributions;

/** The GitHub username for fetching contributions */
export const GITHUB_USERNAME: string =
  profileData.profile.githubUsername ?? profileData.profile.username;
