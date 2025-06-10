import { useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink } from "react-router";
import { useUser } from "../../hooks/useUser";
import { login } from "../../api/users/login";
import TextInput from "../form/TextInput";

function LoginForm(){
    const { setUser } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        
        switch(name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        login({user: {username, password}, setUser});
    }

    return (
        <form className="flex column" onSubmit={handleSubmit}>
            <TextInput name="username" value={username} placeholder="Your Username..." handleChange={handleChange} />
            <TextInput name="password" value={password} placeholder="Your Password..." handleChange={handleChange} />

            <button type="submit" className="box button" style={{ padding: '15px 0px'}}>Login</button>

            <NavLink to='/register'>
                <p>you don't have an account?</p>
            </NavLink>
        </form>
    );  
}

export default LoginForm;