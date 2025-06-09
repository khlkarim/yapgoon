import { NavLink } from "react-router";
import User from "./sidebar/User";


function SideBar(){
    return (
        <div className="box sidebar flex column">
            <User />

            <nav className="flex column">
                <NavLink to='/profile' end className={({ isActive }) => isActive? 'active':''}>
                    <button className='box w-100 button'>Edit Profile</button>
                </NavLink>
                <NavLink to='/profile/owned-channels' className={({ isActive }) => isActive? 'active':''}>
                    <button className='box w-100 button'>Owned Channels</button>
                </NavLink>
                <NavLink to='/profile/joined-channels' className={({ isActive }) => isActive? 'active':''}>
                    <button className='box w-100 button'>Joined Channels</button>
                </NavLink>
            </nav>
        </div>
    );
}

export default SideBar;