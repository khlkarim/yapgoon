import { useEffect, useState } from "react";
import type { IFetch } from "../interfaces/fetch/IFetch";
import type { useFetchProps } from "../interfaces/IProps";

function useFetch({endpoint, method, payload}: useFetchProps): IFetch {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!endpoint || !method) return;
        if(method == 'POST' && !payload) return;

        setIsLoading(true);
        setError(null);

        const url = 'http://localhost:3000/'+endpoint;

        let response;

        if(method == 'GET') {
            if(payload){
                response = fetch(url+ '?' + toQueryParams(payload));
            }else{
                response = fetch(url);
            }
        }else if(method == 'POST' && payload) {
            response = fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(payload)
            });
        }else{
            return;
        }

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
    }, [endpoint, method, payload]);

    return { data, isLoading, error };
}

export default useFetch;

function toQueryParams(payload: object) {
    return new URLSearchParams(
        Object.fromEntries(
            Object.entries(payload).filter(
                    ([, v]) => v !== undefined && v !== null
                ).map(([k, v]) => [k, String(v)])
        )
    ).toString();
} 