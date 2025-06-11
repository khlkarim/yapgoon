import { Route, Routes } from "react-router";
import EditProfile from "./view/EditProfile";
import OwnedChannels from "./view/OwnedChannels";
import JoinedChannels from "./view/JoinedChannels";
import CreateChannel from "./view/CreateChannel";

function View(){
    return (
        <div className="view">
            <Routes>
                <Route path="/" element={<EditProfile />}/>
                <Route path="/create-channel" element={<CreateChannel />} />
                <Route path="/owned-channels" element={<OwnedChannels />} />
                <Route path="/joined-channels" element={<JoinedChannels />} />
            </Routes>
        </div>
    );
}

export default View;