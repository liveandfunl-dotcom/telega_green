import type { Credentials } from './types';

const ID_KEY = 'idInstance';
const TOKEN_KEY = 'apiTokenInstance';

const readStored = (): Credentials | null => {
  const idInstance = localStorage.getItem(ID_KEY);
  const apiTokenInstance = localStorage.getItem(TOKEN_KEY);
  return idInstance && apiTokenInstance ?
    { idInstance, apiTokenInstance } : null;
};

let current: Credentials | null = readStored();

export const setCredentials = (credentials: Credentials) => {
  localStorage.setItem(ID_KEY, credentials.idInstance);
  localStorage.setItem(TOKEN_KEY, credentials.apiTokenInstance);

  current = credentials;
};

export const getCredentials = () => current;
