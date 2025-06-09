import { useEffect, useState } from "react";
import type { IFetch } from "../interfaces/fetch/IFetch";
import type { useFetchProps } from "../interfaces/IProps";

function useFetch({uri, filters}: useFetchProps): IFetch {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uri) return;

        setIsLoading(true);
        setError(null);

        fetch(
            'http://localhost:3000/' +
            uri +
            '?' +
            new URLSearchParams(
                filters && typeof filters === "object"
                    ? Object.fromEntries(
                        Object.entries(filters).filter(
                            ([, v]) => v !== undefined && v !== null
                        ).map(([k, v]) => [k, String(v)])
                    )
                    : {}
            ).toString()
        )
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
    }, [uri, filters]);

    return { data, isLoading, error };
}

export default useFetch;
