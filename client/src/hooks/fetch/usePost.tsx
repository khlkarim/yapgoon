import { useEffect, useState } from "react";

function usePost({endpoint, payload}) {
    const [data, setData] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!endpoint || !payload) return;

        setIsLoading(true);
        setError(null);

        const url = 'http://localhost:3000/'+endpoint;

        const response = fetch(url, {
            method: 'POST',
            headers: {
                "Context-type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        handleResponse(response, setData, setIsLoading, setError);
    }, [endpoint, payload]);

    return { data, isLoading, error };
}

export default usePost;

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