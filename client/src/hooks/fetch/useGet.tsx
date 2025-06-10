import { useEffect, useState } from "react";

function useGet({endpoint, payload}) {
    const [data, setData] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!endpoint) return;

        setIsLoading(true);
        setError(null);

        const url = 'http://localhost:3000/'+endpoint;

        let response;

        if(payload){
            response = fetch(url+ '?' + toQueryParams(payload));
        }else{
            response = fetch(url);
        }

        handleResponse(response, setData, setIsLoading, setError);
    }, [endpoint, payload]);

    return { data, isLoading, error };
}

export default useGet;

function toQueryParams(payload: object) {
    return new URLSearchParams(
        Object.fromEntries(
            Object.entries(payload).filter(
                    ([, v]) => v !== undefined && v !== null
                ).map(([k, v]) => [k, String(v)])
        )
    ).toString();
} 

function handleResponse(response, setData, setIsLoading, setError) {
    response
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
        })
        .catch((err) => {
            setError(err.message || "Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
}