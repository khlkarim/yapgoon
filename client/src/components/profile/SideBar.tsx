import { NavLink } from "react-router";
import User from "./sidebar/User";
import { users } from "../../api/users";
import { useUser } from "../../hooks/useUser";


function SideBar(){
    const { setUser } = useUser();

    function handleLogout() {
        users.logout({setUser});
    }

    return (
        <div className="sidebar flex column" style={{ justifyContent:'start' }}>
            <User />

            <nav className="flex column">
                <NavLink to='/profile' end className={({ isActive }) => isActive? 'active':''}>
                    <button className='box w-100 button'>Edit Profile</button>
                </NavLink>
                <NavLink to='/profile/create-channel' className={({ isActive }) => isActive? 'active':''}>
                    <button className='box w-100 button'>Create Channel</button>
                </NavLink>
                <NavLink to='/profile/owned-channels' className={({ isActive }) => isActive? 'active':''}>
                    <button className='box w-100 button'>Owned Channels</button>
                </NavLink>
                <NavLink to='/profile/joined-channels' className={({ isActive }) => isActive? 'active':''}>
                    <button className='box w-100 button'>Joined Channels</button>
                </NavLink>
                <button className='box w-100 button' onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
}

export default SideBar;