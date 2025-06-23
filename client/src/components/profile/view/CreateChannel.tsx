import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../form/TextInput";
import { channels } from "../../../api/channels";

function CreateChannel() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        
        switch (name) {
            case "name":
                setName(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "public":
                setVisibility(value === "true" ? true : false);
                break;
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        channels.createChannel({ channel: {name, description, public: visibility}});
    }

    return (
        <form className="flex column" onSubmit={handleSubmit}>
            <TextInput type="text" name="name" value={name} placeholder="Channel Name..." handleChange={handleChange} />
            <div className="box flex column">
                <label htmlFor="description">Description</label>
                <textarea name="description" className="box" placeholder="Channel Description" value={description} onChange={handleChange}></textarea>
            </div>
            <div className="box flex column">
                <label htmlFor="name">Status</label>
                <select name="public" className="box" value={visibility ? "true" : "false"} onChange={handleChange} style={{ color: 'white', background: 'black' }}>
                    <option value="false" className="box" style={{ color: 'white', background: 'black' }}>Private</option>
                    <option value="true" className="box" style={{ color: 'white', background: 'black' }}>Public</option>
                </select>
            </div>
            <button className="box button" style={{ padding: '15px 0px' }}>Create Channel</button>
        </form>
    );
}

export default CreateChannel;