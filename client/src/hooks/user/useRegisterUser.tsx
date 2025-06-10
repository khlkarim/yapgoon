import { useEffect, useState } from "react";

function useRegisterUser({ user }){
    const [payload, setPayload] = useState(user);

    const {data, isLoading, error} = usePost({
        endpoint: 'auth/register',
        payload
    });

    useEffect(() => {
        setPayload(user);
    }, [user]);

    console.log();
}

export default useRegisterUser;