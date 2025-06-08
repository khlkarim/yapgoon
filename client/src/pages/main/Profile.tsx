import SideBar from "../../components/profile/SideBar";
import View from "../../components/profile/View";

function Profile(){
    return (
        <div className='flex w-80'>
            <SideBar />
            <View />
        </div>
    );
}

export default Profile;