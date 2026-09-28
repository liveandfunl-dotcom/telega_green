import { useState } from 'react';
import { useNavigate } from 'react-router';
import { setCredentials } from '../../api';

import Tinput from '../../components/tinput/Tinput';

import './auth.css';

function Authenticate() {
    const navigate = useNavigate();
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    const login = () => {
        const id = idInstance.trim();
        const token = apiTokenInstance.trim();
        if (!id || !token) return;

        setCredentials({ idInstance: id, apiTokenInstance: token });
        navigate('/chats/0', { replace: true });// replace location history
    };

    return (
        <div className="auth">
            <div className="auth__form">
                <div className="auth__logo"></div>
                <div className="auth__title">Telegram</div>
                <div className="auth__text">Please insert your <br/> "idInstance" and "apiTokenInstance"
                </div>
                <div className="auth__field">
                    <Tinput
                        label="idInstance"
                        name="idInstance"
                        value={idInstance}
                        onChange={setIdInstance}
                    />
                </div>
                <div className="auth__field">
                    <Tinput
                        label="apiTokenInstance"
                        name="apiTokenInstance"
                        value={apiTokenInstance}
                        onChange={setApiTokenInstance}
                    />
                </div>
                <div className="auth__button" onClick={login}>Login in GREEN API</div>
            </div>
        </div>
    )
}

export default Authenticate;
