import { NavLink } from "react-router";
import { useUser } from "../../hooks/useUser";
import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../form/TextInput";
import { users } from "../../api/users";
import useWS from "../../hooks/useWS";
import { isValidEmail } from "../../utils/valid";
import { notify } from "../../utils/notify";

function RegisterForm(){
    const { setUser } = useUser();
    const { connect } = useWS();

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

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(!isValidEmail(email)) {
            notify({ status:'error', message:'Email must be valid' });
            return;
        }

        if(await users.register({user: {username, email, password}, setUser})) {
            connect();
        }
    }

    return (
        <form className="flex column" onSubmit={handleSubmit}>
            <TextInput type="text" name="username" value={username} placeholder="Your Username..." handleChange={handleChange} />
            <TextInput type="email" name="email" value={email} placeholder="Your Email..." handleChange={handleChange} />
            <TextInput type="password" name="password" value={password} placeholder="Your Password..." handleChange={handleChange} />

            <button type="submit" className="box button" style={{ padding: '15px 0px'}}>Register</button>

            <NavLink to='/login'>
                <p>you already have an account?</p>
            </NavLink>
        </form>
    );  
}

export default RegisterForm;