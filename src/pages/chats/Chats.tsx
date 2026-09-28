import { useState } from 'react';

import ContactItem from "../../components/contactItem/contactItem";
import NewContact from '../../components/newContact/NewContact';

import './chats.css';



function Chats() {
    const [isNewContactOpen, setNewContactOpen] = useState(false);

    return (
        <div className="chats">
            <div className="chats__left">
                <div className="chats__list">
                    <ContactItem/>
                </div>
                <div className="chats__new" onClick={() => setNewContactOpen(true)}></div>
            </div>
            <div className="chats_right"></div>
            {isNewContactOpen && <NewContact onClose={() => setNewContactOpen(false)} />}
        </div>
    )
}

export default Chats;
