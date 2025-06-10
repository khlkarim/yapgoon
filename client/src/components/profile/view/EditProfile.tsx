import { useUser } from "../../../hooks/useUser";

function EditProfile(){
    const { user } = useUser();

    return (
        <div>Edit Profile</div>
    );
}

export default EditProfile;