// Update tab title
export const updateTitle = (title) => (document.title = title);

// Utility functions for common checks
export const isValidString = (value) => {
  return value && typeof value === 'string' && value.trim().length > 0;
};

export const isValidArray = (value) => {
  return Array.isArray(value) && value.length > 0;
};

export const isValidUrl = (value) => {
  if (!isValidString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// Theme utilities
export const getStoredTheme = () => localStorage.getItem("theme");

export const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const setTheme = (theme) => {
  if (
    theme === "auto" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }
};
