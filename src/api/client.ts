import { API_URL } from '../config';
import { getCredentials } from './credentials';

interface RequestOptions {
  httpMethod?: 'GET' | 'POST' | 'DELETE';
  body?: unknown;
  suffix?: string | number;
  query?: Record<string, string | number>;
  signal?: AbortSignal;
}

const buildUrl = (method: string, suffix?: string | number, query?: RequestOptions['query']) => {
  const credentials = getCredentials();
  if (!credentials) {
    throw new Error('idInstance and apiTokenInstance are not set');
  }

  const { idInstance, apiTokenInstance } = credentials;
  let url = `${API_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
  if (suffix !== undefined) url += `/${suffix}`;
  if (query) {
    const params = new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)]));
    url += `?${params}`;
  }

  return url;
};

const errorText = (status: number, serverMessage?: string) => {
  if (status === 401 || status === 403) {
    return 'Wrong idInstance or apiTokenInstance';
  }
  if (status === 429) {
    return 'Too many requests, please try again later';
  }

  return serverMessage || `Server error (${status})`;
};

// Parses JSON body; an empty body (e.g. receiveNotification with no events) becomes null.
const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const request = async <T>(
  method: string,
  { httpMethod = 'GET', body, suffix, query, signal }: RequestOptions = {},
): Promise<T> => {
  const url = buildUrl(method, suffix, query);

  let response: Response;

  try {
    response = await fetch(url, {
      method: httpMethod,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError'){
      throw error;
    }
    throw new Error('No connection to the server');
  }

  const data = await parseBody(response);

  if (!response.ok) {
    const serverMessage =
      data && typeof data === 'object' && 'message' in data ? String(data.message) : undefined;
    throw new Error(errorText(response.status, serverMessage));
  }

  return data as T;
};
