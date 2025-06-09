import { NavLink } from "react-router";

function MainNavBar(){
    return (
        <nav className="box flex w-80">
            <NavLink to='/inbox' className={({ isActive }) => isActive? 'active':''}>
                <button className='box button'>Inbox</button>
            </NavLink>
            <NavLink to='/channels' className={({ isActive }) => isActive? 'active':''}>
                <button className='box button'>Channels</button>
            </NavLink>
            <NavLink to='/profile' className={({ isActive }) => isActive? 'active':''}>
                <button className='box button'>Profile</button>
            </NavLink>
        </nav>
    );
}

export default MainNavBar;