import type { Dispatch, SetStateAction } from "react";

interface handleResponseParams {
    response: Promise<Response>;
    setData: Dispatch<SetStateAction<object | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
}

export function handleResponse({response, setData, setIsLoading, setError}: handleResponseParams) {
    response
    .then((response: Response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data: object) => {
        setData(data);
    })
    .catch((err: Error) => {
        setError(err.message || "Something went wrong");
    })
    .finally(() => {
        setIsLoading(false);
    });
}

export function toQueryParams(payload: object) {
    return new URLSearchParams(
        Object.fromEntries(
            Object.entries(payload).filter(
                    ([, v]) => v !== undefined && v !== null
                ).map(([k, v]) => [k, String(v)])
        )
    ).toString();
}