import { NavLink } from "react-router";

function AuthNavBar() {
    return (
        <nav className="box flex w-80">
            <NavLink to='/login' className={({ isActive }) => isActive? 'active':''}>
                <button className="box button">Login</button>
            </NavLink>
            <NavLink to='/register' className={({ isActive }) => isActive? 'active':''}>
                <button className="box button">Register</button>
            </NavLink>
        </nav>
    );  
}

export default AuthNavBar;