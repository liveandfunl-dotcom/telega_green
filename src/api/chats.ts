import { request } from './client';
import type { ChatHistoryMessage, ChatItem } from './types';

export const getChats = (signal?: AbortSignal) => {
  return request<ChatItem[]>('getChats', { signal })
};

export const getChatHistory = (chatId: string, count = 10, signal?: AbortSignal) => {
  request<ChatHistoryMessage[]>('getChatHistory', {
    httpMethod: 'POST',
    body: { chatId, count },
    signal,
  });
}
