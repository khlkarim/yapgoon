import { NavLink } from "react-router";
import { useUser } from "../../hooks/useUser";
import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../form/TextInput";
import { users } from "../../api/users";

function RegisterForm(){
    const { setUser } = useUser();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        
        switch(name) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        users.register({user: {username, email, password}, setUser});
    }

    return (
        <form className="flex column" onSubmit={handleSubmit}>
            <TextInput name="username" value={username} placeholder="Your Username..." handleChange={handleChange} />
            <TextInput name="email" value={email} placeholder="Your Email..." handleChange={handleChange} />
            <TextInput name="password" value={password} placeholder="Your Password..." handleChange={handleChange} />

            <button type="submit" className="box button" style={{ padding: '15px 0px'}}>Register</button>

            <NavLink to='/login'>
                <p>you already have an account?</p>
            </NavLink>
        </form>
    );  
}

export default RegisterForm;