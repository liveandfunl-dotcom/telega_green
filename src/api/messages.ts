import { request } from './client';
import type { SendMessageResponse } from './types';

export const sendMessage = (chatId: string, message: string, signal?: AbortSignal) =>
  request<SendMessageResponse>('sendMessage', {
    httpMethod: 'POST',
    body: { chatId, message },
    signal,
  });
