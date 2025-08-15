// Application constants
export const PAGINATION = {
  ITEMS_PER_PAGE: 6,
  DEFAULT_PAGE: 1,
};

export const TIMEOUTS = {
  NAV_CLOSE_DELAY: 125,
  THEME_TRANSITION: 200,
};

export const LIMITS = {
  MAX_MAIN_PROJECTS: 3,
  MIN_SEARCH_LENGTH: 1,
};

export const ARIA_LABELS = {
  GITHUB_PROFILE: "Check out my GitHub profile.",
  EXTERNAL_LINK: "External link",
  VISIT_BLOG: "Visit blog",
  SEARCH_PROJECTS: "Search projects",
  THEME_TOGGLE: "Toggle theme",
};

export const ERROR_MESSAGES = {
  NO_PROJECTS: "Oops, you do not have any GitHub projects yet...",
  NETWORK_ERROR: "Network error - check URLs in src/app/apiSlice.js",
  CONFIG_ERROR: "Configuration error - check githubUsername in src/config.js",
};