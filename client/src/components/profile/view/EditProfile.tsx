import { useState, type ChangeEvent, type FormEvent } from "react";
import { useUser } from "../../../hooks/useUser";
import TextInput from "../../form/TextInput";
import { users } from "../../../api/users";

function EditProfile(){
    const { user, setUser } = useUser();
    
    const [username, setUsername] = useState(user?.username ?? '');
    const [email, setEmail] = useState(user?.email ?? '');

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        
        switch(name) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        users.editProfile({user: {...user, username, email}, setUser});
    }

    return (
        <form className="flex column" onSubmit={handleSubmit}>
            <TextInput type="text" name="username" value={username} placeholder="Your Username..." handleChange={handleChange} />
            <TextInput type="text" name="email" value={email} placeholder="Your Email..." handleChange={handleChange} />

            <button type="submit" className="box button" style={{ padding: '15px 0px'}}>Edit Profile</button>
        </form>
    ); 
}

export default EditProfile;