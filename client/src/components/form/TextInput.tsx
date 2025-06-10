import type { ChangeEventHandler } from "react";

interface TextInputProps {
    name: string;
    value: string;
    placeholder: string;
    handleChange: ChangeEventHandler
}

function TextInput({ name, value, placeholder, handleChange }: TextInputProps) {
    return (
        <div className="box flex column">
            <label htmlFor="name">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <input 
                type="text"
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

export default TextInput;