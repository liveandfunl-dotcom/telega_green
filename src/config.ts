const apiUrl = import.meta.env.VITE_GREEN_API_URL;

if (!apiUrl) {
  throw new Error('VITE_GREEN_API_URL is not set in .env');
}

export const API_URL = apiUrl.replace(/\/+$/, '');
