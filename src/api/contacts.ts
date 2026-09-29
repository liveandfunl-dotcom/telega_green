import { request } from './client';
import type { AddContactResponse } from './types';

export const addContact = (
  phoneNumber: string,
  firstName: string,
  lastName = '',
  signal?: AbortSignal,
) =>
  request<AddContactResponse>('addContact', {
    httpMethod: 'POST',
    body: { chatId: `${phoneNumber}@c.us`, firstName, lastName },
    signal,
  });
