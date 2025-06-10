import { useUser } from "../../../hooks/useUser";

function List(){
    const { user } = useUser();

    return (
        <div className="box">
            List
        </div>
    );
}

export default List;