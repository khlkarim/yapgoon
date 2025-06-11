import Filter from "./sidebar/Filter";
import List from "./sidebar/List";

function SideBar(){
    function filterList(){
        console.log("hi");
    }

    return (
        <div className="sidebar flex column">
            <Filter filters={null} filterList={filterList} />
            <List />
        </div>
    );
}

export default SideBar;