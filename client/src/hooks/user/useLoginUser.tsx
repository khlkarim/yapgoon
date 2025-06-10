import { useEffect, useState } from "react";

function useLoginUser({ user }){
    const [payload, setPayload] = useState(user);

    const {data, isLoading, error} = usePost({
        endpoint: 'auth/login',
        payload
    });

    useEffect(() => {
        setPayload(user);
    }, [user]);
}

export default useLoginUser;