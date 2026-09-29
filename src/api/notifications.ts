import { request } from './client';
import type { Notification } from './types';

// Seconds the server holds the request open while waiting for a notification (max 60)
const RECEIVE_TIMEOUT = 60;

export const receiveNotification = (signal?: AbortSignal) =>
  request<Notification | null>('receiveNotification', {
    query: { receiveTimeout: RECEIVE_TIMEOUT },
    signal,
  });

// Must be called after every received notification, otherwise the queue stalls.
export const deleteNotification = (receiptId: number, signal?: AbortSignal) =>
  request<{ result: boolean }>('deleteNotification', {
    httpMethod: 'DELETE',
    suffix: receiptId,
    signal,
  });
