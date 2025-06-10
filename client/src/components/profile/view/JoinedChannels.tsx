import { useUser } from "../../../hooks/useUser";

function JoinedChannels(){
    const { user } = useUser();

    return (
        <div>JoinedChannels</div>
    );
}

export default JoinedChannels;