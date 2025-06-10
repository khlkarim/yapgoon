import { useUser } from "../../../hooks/useUser";

function OwnedChannels(){
    const { user } = useUser();

    return (
        <div>Owned Channels</div>
    );  
}

export default OwnedChannels;