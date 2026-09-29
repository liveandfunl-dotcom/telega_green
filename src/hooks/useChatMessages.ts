import { useEffect, useRef, useState } from 'react';

import {
    deleteNotification,
    getChatHistory,
    receiveNotification,
    sendMessage,
    type ChatHistoryMessage,
} from '../api';

const isAbort = (err: unknown) => err instanceof DOMException && err.name === 'AbortError';

// sendMessage only queues the message, so history is reloaded after a delay
const REFRESH_AFTER_SEND_DELAY = 1000;

export const useChatMessages = (chatId: string) => {
    const [messages, setMessages] = useState<ChatHistoryMessage[]>([]);
    const isSendingRef = useRef(false);
    const refreshAfterSendRef = useRef(() => {});

    useEffect(() => {
        const notificationsController = new AbortController();
        let historyController: AbortController | null = null;
        let refreshTimer: number | undefined;

        // A new call cancels the request in flight, so an older response can't overwrite a newer one
        const refreshHistory = async () => {
            historyController?.abort();
            historyController = new AbortController();

            try {
                const history = await getChatHistory(
                    chatId,
                    undefined,
                    historyController.signal
                );
                // History comes newest first, the list shows oldest at the top
                setMessages(history
                    .filter((message) => message.textMessage)
                    .reverse()
                );
            } catch (err) {
                if (!isAbort(err)) throw err;
            }
        };

        const refreshAfterSend = () => {
            window.clearTimeout(refreshTimer);
            refreshTimer = window.setTimeout(refreshHistory, REFRESH_AFTER_SEND_DELAY);
        };

        // Receive a notification, confirm it with delete,
        // reload history for current chat
        const listenNotifications = async () => {
            const { signal } = notificationsController;
            try {
                while (!signal.aborted) {
                    const notification = await receiveNotification(signal);
                    if (!notification) continue;

                    await deleteNotification(notification.receiptId, signal);
                    if (notification.body.senderData?.chatId === chatId) refreshHistory();
                }
            } catch (err) {
                if (!isAbort(err)) throw err;
            }
        };

        refreshAfterSendRef.current = refreshAfterSend;
        refreshHistory();
        listenNotifications();
        return () => {
            refreshAfterSendRef.current = () => {};
            notificationsController.abort();
            historyController?.abort();
            window.clearTimeout(refreshTimer);
        };
    }, [chatId]);

    const send = async (text: string) => {
        if (isSendingRef.current) return false;

        isSendingRef.current = true;
        try {
            await sendMessage(chatId, text);
            refreshAfterSendRef.current();
            return true;
        } finally {
            isSendingRef.current = false;
        }
    };

    return { messages, send };
};
