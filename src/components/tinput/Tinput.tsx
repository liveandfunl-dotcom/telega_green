import { useId } from 'react';
import './tinput.css';

type TinputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    name?: string;
    type?: 'text' | 'password';
};

function Tinput({ label, value, onChange, name, type = 'text' }: TinputProps) {
    const id = useId();

    return (
        <div className="tinput">
            <input
                id={id}
                className="tinput__field"
                type={type}
                name={name}
                value={value}
                autoComplete="off"
                onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={id} className="tinput__label">{label}</label>
        </div>
    )
}

export default Tinput;
