import { API_URL } from '../config';
import { getCredentials } from './credentials';

interface RequestOptions {
  httpMethod?: 'GET' | 'POST' | 'DELETE';
  body?: unknown;
  suffix?: string | number;
  signal?: AbortSignal;
}

export const buildUrl = (method: string, suffix?: string | number) => {
  const credentials = getCredentials();
  if (!credentials) {
    throw new Error('idInstance and apiTokenInstance are not set');
  }

  const { idInstance, apiTokenInstance } = credentials;
  const url = `${API_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`;

  return suffix === undefined ? url : `${url}/${suffix}`;
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
  { httpMethod = 'GET', body, suffix, signal }: RequestOptions = {},
): Promise<T> => {
  const url = buildUrl(method, suffix);

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
