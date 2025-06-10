import { useState } from "react";
import { NavLink } from "react-router";

function LoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(e);
    }

    return (
        <form className="flex column" onSubmit={handleSubmit}>
            <div className="box flex column">
                <label htmlFor="username">Username or Email</label>
                <input 
                    type="text"
                    name="username"
                    value={username}
                    style={{ background: 'black' }}
                    className="box" 
                    placeholder="Your Username or Email..."
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="box flex column">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    className="box" 
                    placeholder="Your Password..." 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="box button" style={{ padding: '15px 0px'}}>Login</button>
            <NavLink to='/register'>
                <p>you don't have an account?</p>
            </NavLink>
        </form>
    );  
}

export default LoginForm;