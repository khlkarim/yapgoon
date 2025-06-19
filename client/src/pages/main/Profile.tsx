import SideBar from "../../components/profile/SideBar";
import View from "../../components/profile/View";
import { useUser } from "../../hooks/useUser";

function Profile(){
    useUser();

    return (
        <div className='flex w-80'>
            <SideBar />
            <View />
        </div>
    );
}

export default Profile;