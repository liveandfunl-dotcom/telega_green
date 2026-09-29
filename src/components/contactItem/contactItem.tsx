import { memo } from 'react';

import './contactItem.css';

type ContactItemProps = {
    name: string;
    message?: string;
};

const initials = (userName: string) => {
    let [name, surname] = userName.split(' ');
    name = name ?? '';
    surname = surname ?? '';

    return `${name.charAt(0)}${surname.charAt(0)}`
};

function ContactItem({ name, message }: ContactItemProps) {
    return(
        <div className="contact">
            <div className="contact__item">
                <div className="contact__logo">{initials(name)}</div>
                <div className="contact__name">{name}</div>
                <div className="contact__message">{message}</div>
            </div>
        </div>
    )
}

export default memo(ContactItem);
