/**
 * API Client for OctoFit Tracker
 * 
 * Environment Variables:
 * - VITE_CODESPACE_NAME: Required for Codespaces deployments
 *   Set in .env.local or as environment variable
 *   Example: VITE_CODESPACE_NAME=my-codespace
 */

/**
 * Get the API base URL
 * Uses VITE_CODESPACE_NAME for Codespaces, falls back to localhost
 */
export const getApiBaseUrl = () => {
  const codespaceeName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceeName && codespaceeName !== 'undefined') {
    return `https://${codespaceeName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8000';
};

/**
 * Fetch from API with error handling
 */
export const apiCall = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
};

/**
 * Extract data from paginated or array responses
 */
export const extractData = (response) => {
  if (Array.isArray(response)) {
    return response;
  }
  if (response.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (response.items && Array.isArray(response.items)) {
    return response.items;
  }
  return [];
};
