import { NavLink } from "react-router";

function MainNavBar(){
    return (
        <nav className="box flex w-80">
            <NavLink to='/inbox' className={({ isActive }) => isActive? 'active':''}>
                <button className='box'>Inbox</button>
            </NavLink>
            <NavLink to='/channels' className={({ isActive }) => isActive? 'active':''}>
                <button className='box'>Channels</button>
            </NavLink>
            <NavLink to='/profile' className={({ isActive }) => isActive? 'active':''}>
                <button className='box'>Profile</button>
            </NavLink>
        </nav>
    );
}

export default MainNavBar;