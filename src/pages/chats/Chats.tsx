import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import ContactItem from "../../components/contactItem/contactItem";
import NewContact from '../../components/newContact/NewContact';
import ChatWindow from '../../components/chatWindow/ChatWindow';
import { getChats, type ChatItem } from '../../api';

import './chats.css';


function Chats() {
    const [isNewContactOpen, setNewContactOpen] = useState(false);
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedChatId = id && id !== '0' ? id : null;

    const selectChat = useCallback((chatId: string) => {
        navigate(`/chats/${encodeURIComponent(chatId)}`);
    }, [navigate]);

    useEffect(() => {
        const controller = new AbortController();
        getChats(controller.signal)
            .then(setChats)
            .catch((err) => {
                if (err instanceof DOMException && err.name === 'AbortError') return;
                setError(err instanceof Error ? err.message : String(err));
            });
        return () => controller.abort();
    }, []);

    return (
        <div className="chats">
            <div className="chats__left">
                <div className="chats__list">
                    {error && <div className="chats__error">{error}</div>}
                    {chats.map((chat) => (
                        <ContactItem
                            key={chat.chatId}
                            chatId={chat.chatId}
                            name={chat.name || String(chat.phoneNumber)}
                            isSelected={chat.chatId === selectedChatId}
                            onSelect={selectChat}
                        />
                    ))}
                </div>
                <div className="chats__new" onClick={() => setNewContactOpen(true)}></div>
            </div>
            <div className="chats__right">
                {selectedChatId && <ChatWindow key={selectedChatId} chatId={selectedChatId} />}
            </div>
            {isNewContactOpen && <NewContact onClose={() => setNewContactOpen(false)} />}
        </div>
    )
}

export default Chats;
