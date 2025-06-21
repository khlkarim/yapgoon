import { useState } from "react";

function Input() {
    const [message, setMessage] = useState<string>('');

    function handleSend() {
        console.log(message);
    }

    return (
        <div className="flex">
            <input
                type="text"
                name="search"
                value={message}
                style={{ background: 'black', flex: '4' }}
                className="box"
                placeholder="Write a message"
                onChange={(e) => {setMessage(e.target.value)}}
            />            
            <button className="box button" style={{ flex: '1' }} onClick={handleSend}>Send</button>
        </div>
    );
}

export default Input;