import type { ChangeEventHandler } from "react";

interface PasswordInputProps {
    name: string;
    value: string;
    placeholder: string;
    handleChange: ChangeEventHandler
}

function PasswordInput({ name, value, placeholder, handleChange }: PasswordInputProps) {
    return (
        <div className="box flex column">
            <label htmlFor="name">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <input 
                type="password"
                name={name}
                value={value}
                style={{ background: 'black' }}
                className="box" 
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    );
}

export default PasswordInput;