import List from "../channels/List";
import Filter from "./sidebar/Filter";

function SideBar(){
    function filterList(){
        console.log("hi");
    }

    return (
        <div className="sidebar flex column">
            <Filter filters={{}} filterList={filterList} />
            <List endpoint="channels/joined" filters={{}} action={undefined} />
        </div>
    );
}

export default SideBar;