import { NavLink } from "react-router";

function AuthNavBar() {
    return (
        <nav className="box flex w-80">
            <NavLink to='/login' className={({ isActive }) => isActive? 'active':''}>
                <button className="box">Login</button>
            </NavLink>
            <NavLink to='/register' className={({ isActive }) => isActive? 'active':''}>
                <button className="box">Register</button>
            </NavLink>
        </nav>
    );  
}

export default AuthNavBar;