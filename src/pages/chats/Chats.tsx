import { useEffect, useState } from 'react';

import ContactItem from "../../components/contactItem/contactItem";
import NewContact from '../../components/newContact/NewContact';
import { getChats, type ChatItem } from '../../api';

import './chats.css';


function Chats() {
    const [isNewContactOpen, setNewContactOpen] = useState(false);
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [error, setError] = useState('');

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
                        <ContactItem key={chat.chatId} name={chat.name || String(chat.phoneNumber)} />
                    ))}
                </div>
                <div className="chats__new" onClick={() => setNewContactOpen(true)}></div>
            </div>
            <div className="chats__right"></div>
            {isNewContactOpen && <NewContact onClose={() => setNewContactOpen(false)} />}
        </div>
    )
}

export default Chats;
