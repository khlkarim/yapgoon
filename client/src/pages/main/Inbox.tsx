import SideBar from "../../components/inbox/SideBar";
import View from "../../components/inbox/View";

function Inbox(){
    return (
        <div className='flex w-80'>
            <SideBar />
            <View />
        </div>
    );
}

export default Inbox;