import Filter from "../../components/channels/Filter";
import List from "../../components/channels/List";

function Channels(){
    return (
        <div className='flex column w-80'>
            <Filter />
            <List />
        </div>
    );
}

export default Channels;