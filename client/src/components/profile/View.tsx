import { Route, Routes } from "react-router";
import EditProfile from "./view/EditProfile";
import OwnedChannels from "./view/OwnedChannels";
import JoinedChannels from "./view/JoinedChannels";

function View(){
    return (
        <div className="box view">
            <Routes>
                <Route path="/" element={<EditProfile />}/>
                <Route path="/owned-channels" element={<OwnedChannels />} />
                <Route path="/joined-channels" element={<JoinedChannels />} />
            </Routes>
        </div>
    );
}

export default View;