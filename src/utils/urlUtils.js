import { siteConfig } from '../config';

/**
 * Generates a full URL for an external resource based on the site configuration
 * @param {string} resourceUrl - The resource URL (relative or absolute)
 * @returns {string|null} - The full URL or null if invalid
 */
export const generateResourceUrl = (resourceUrl) => {
  if (!resourceUrl) {
    console.warn('Resource URL is required');
    return null;
  }

  // Handle relative URLs (most common case for GitHub Pages)
  if (resourceUrl.startsWith('/')) {
    const baseUrl = siteConfig.url.replace(/\/$/, ''); // Remove trailing slash
    return `${baseUrl}${resourceUrl}`;
  }
  
  // Handle absolute URLs - validate they're on the same domain
  if (resourceUrl.startsWith('http')) {
    try {
      const resourceDomain = new URL(resourceUrl).origin;
      const siteDomain = new URL(siteConfig.url).origin;
      
      if (resourceDomain === siteDomain) {
        return resourceUrl;
      } else {
        console.warn(`External resource URL ${resourceUrl} is not on the same domain as ${siteConfig.url}`);
        return null;
      }
    } catch (error) {
      console.error(`Invalid absolute URL: ${resourceUrl}`, error);
      return null;
    }
  }
  
  // Handle relative URLs without leading slash
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  return `${baseUrl}/${resourceUrl}`;
};

/**
 * Validates if a resource URL is valid and within the same domain
 * @param {string} resourceUrl - The resource URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateResourceUrl = (resourceUrl) => {
  if (!resourceUrl || typeof resourceUrl !== 'string') {
    return false;
  }

  try {
    const fullUrl = generateResourceUrl(resourceUrl);
    return fullUrl !== null;
  } catch (error) {
    console.error(`Error validating resource URL: ${resourceUrl}`, error);
    return false;
  }
};

/**
 * Validates an external resource configuration object
 * @param {Object} resource - The external resource configuration
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateExternalResource = (resource) => {
  if (!resource || typeof resource !== 'object') {
    console.error('External resource must be an object');
    return false;
  }

  // Check required fields
  const requiredFields = ['id', 'name', 'url'];
  for (const field of requiredFields) {
    if (!resource[field] || typeof resource[field] !== 'string') {
      console.error(`External resource missing required field: ${field}`);
      return false;
    }
  }

  // Validate URL
  if (!validateResourceUrl(resource.url)) {
    console.error(`Invalid URL for external resource ${resource.id}: ${resource.url}`);
    return false;
  }

  return true;
};

/**
 * Filters and validates an array of external resource configurations
 * @param {Array} resources - Array of external resource configurations
 * @returns {Array} - Array of valid external resources
 */
export const processExternalResources = (resources) => {
  if (!Array.isArray(resources)) {
    console.warn('External resources configuration must be an array');
    return [];
  }

  return resources.filter(resource => {
    const isValid = validateExternalResource(resource);
    if (!isValid) {
      console.warn(`Excluding invalid external resource:`, resource);
    }
    return isValid;
  });
};