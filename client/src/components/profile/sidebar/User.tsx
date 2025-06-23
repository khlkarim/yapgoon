import { useUser } from "../../../hooks/useUser";

function User(){
    const { user } = useUser();

    return (
        <div className="box flex column" style={{ gap: '5px' }}>
            <div style={{ fontWeight: "bold" }}>{user.username}</div>
            <div style={{ color: "grey" }}>{user.email}</div>
        </div>
    );
}

export default User;