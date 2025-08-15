import { useEffect } from 'react';
import { siteConfig } from '../config';

// Custom hook for managing document title
export const useTitle = (pageTitle, userData = null) => {
  useEffect(() => {
    const name = userData?.name || siteConfig.displayName;
    const title = pageTitle ? `${name} | ${pageTitle}` : name;
    document.title = title;
  }, [pageTitle, userData]);
};

// Centralized title configuration
export const TITLES = {
  HOME: siteConfig.siteName,
  ALL_PROJECTS: 'All Projects',
  DEFAULT: siteConfig.siteName
};