import { useUser } from "../../../hooks/useUser";

function User(){
    const { user } = useUser();

    return (
        <div className="box">
            {user?.username}
        </div>
    );
}

export default User;