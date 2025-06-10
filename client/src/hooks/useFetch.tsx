import { useEffect, useState } from "react";
import { handleResponse, toQueryParams } from "../utils/utils";

interface useFetchProps {
    endpoint: string;
    params: object;
}

function useFetch({endpoint, params}: useFetchProps) {
    const [data, setData] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!endpoint) return;

        setIsLoading(true);
        setError(null);

        const url = 'http://localhost:3000/'+endpoint;

        let response;

        if(params){
            response = fetch(url+ '?' + toQueryParams(params));
        }else{
            response = fetch(url);
        }

        handleResponse({response, setData, setIsLoading, setError});
    }, [endpoint, params]);

    return { data, isLoading, error };
}

export default useFetch;