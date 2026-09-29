import { memo } from 'react';

import './contactItem.css';

type ContactItemProps = {
    chatId: string;
    name: string;
    isSelected: boolean;
    onSelect: (chatId: string) => void;
};

const initials = (userName: string) => {
    let [name, surname] = userName.split(' ');
    name = name ?? '';
    surname = surname ?? '';

    return `${name.charAt(0)}${surname.charAt(0)}`
};

function ContactItem({ chatId, name, isSelected, onSelect }: ContactItemProps) {
    return(
        <div className={`contact${isSelected ? ' contact--selected' : ''}`} onClick={() => onSelect(chatId)}>
            <div className="contact__item">
                <div className="contact__logo">{initials(name)}</div>
                <div className="contact__name">{name}</div>
            </div>
        </div>
    )
}

export default memo(ContactItem);
