import { useRef, useState } from 'react';

import Tinput from '../tinput/Tinput';
import { addContact } from '../../api';

import './newContact.css';

type NewContactProps = {
    onClose: () => void;
};

function NewContact({ onClose }: NewContactProps) {
    const [error, setError] = useState('');
    const loadingRef = useRef(false);
    const phoneRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const submit = async () => {
        const phone = phoneRef.current?.value.trim() ?? '';
        const firstName = firstNameRef.current?.value.trim() ?? '';
        const lastName = lastNameRef.current?.value.trim() ?? '';
        if (loadingRef.current || !phone || !firstName) return;

        loadingRef.current = true;
        setError('');
        try {
            await addContact(phone, firstName, lastName);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
            loadingRef.current = false;
        }
    };

    return (
        <div className="new-contact">
            <div className="new-contact__dialog">
                <div className="new-contact__title">New Contact</div>
                <div className="new-contact__body">
                    <div className="new-contact__avatar"></div>
                    <div className="new-contact__fields">
                        <div className="new-contact__field">
                            <Tinput label="Phone Number" ref={phoneRef} />
                        </div>
                        <div className="new-contact__field">
                            <Tinput label="First name (required)" ref={firstNameRef} />
                        </div>
                        <div className="new-contact__field">
                            <Tinput label="Last name (optional)" ref={lastNameRef} />
                        </div>
                    </div>
                </div>
                {error && <div className="new-contact__error">{error}</div>}
                <div className="new-contact__actions">
                    <div className="new-contact__button" onClick={onClose}>Cancel</div>
                    <div className="new-contact__button" onClick={submit}>Add</div>
                </div>
            </div>
        </div>
    )
}

export default NewContact;
