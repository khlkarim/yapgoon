import { useEffect, useState } from "react";
import { api } from "../api/methods";

interface useFetchProps {
    endpoint: string;
    params: object;
}

function useFetch({endpoint, params}: useFetchProps) {
    const [data, setData] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        api.get({ endpoint, params })
            .then((data) => {
                setData(data);
            })
            .catch((err: Error)=>{
                setError("Error: " + err.message);
            })
            .finally(()=>{
                setIsLoading(false);
            });
    }, [endpoint, params]);

    return { data, isLoading, error };
}

export default useFetch;