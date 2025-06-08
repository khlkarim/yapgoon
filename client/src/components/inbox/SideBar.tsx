import Filter from "./sidebar/Filter";
import List from "./sidebar/List";

function SideBar(){
    return (
        <div className="box sidebar flex column">
            <Filter />
            <List />
        </div>
    );
}

export default SideBar;