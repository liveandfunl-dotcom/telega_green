import { useEffect, useRef } from 'react';

import { useChatMessages } from '../../hooks/useChatMessages';

import './chatWindow.css';

type ChatWindowProps = {
    chatId: string;
};

const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function ChatWindow({ chatId }: ChatWindowProps) {
    const { messages, send } = useChatMessages(chatId);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const lastMessageId = messages.at(-1)?.idMessage;

    useEffect(() => {
        const list = listRef.current;
        if (list) list.scrollTop = list.scrollHeight;
    }, [lastMessageId]);

    const sendMessage = async () => {
        const input = inputRef.current;
        const text = input?.value.trim() ?? '';
        if (!input || !text) return;

        if (await send(text)) input.value = '';
    };

    return (
        <div className="chat-window">
            <div className="chat-window__messages" ref={listRef}>
                {messages.map((message) => (
                    <div key={message.idMessage} className={`chat-window__message chat-window__message--${message.type}`}>
                        <div className="chat-window__text">{message.textMessage}</div>
                        <div className="chat-window__time">{formatTime(message.timestamp)}</div>
                    </div>
                ))}
            </div>
            <div className="chat-window__composer">
                <input
                    className="chat-window__input"
                    placeholder="Message"
                    ref={inputRef}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.nativeEvent.isComposing) sendMessage();
                    }}
                />
                <div className="chat-window__send" onClick={sendMessage}></div>
            </div>
        </div>
    )
}

export default ChatWindow;
