const BASE_URL = "http://localhost:3000";

interface RequestParams {
    endpoint: string;
}

interface GetParams extends RequestParams {
    params?: Record<string, unknown>;
}

interface BodyParams extends RequestParams {
    body?: object;
}

async function get({ endpoint, params }: GetParams): Promise<unknown> {
    const url = new URL(endpoint, BASE_URL);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}

async function post({ endpoint, body }: BodyParams): Promise<unknown> {
    return requestWithBody('POST', { endpoint, body });
}

async function patch({ endpoint, body }: BodyParams): Promise<unknown> {
    return requestWithBody('PATCH', { endpoint, body });
}

async function requestWithBody(
    method: 'POST' | 'PATCH',
    { endpoint, body }: BodyParams
): Promise<unknown> {
    const url = new URL(endpoint, BASE_URL);

    const response = await fetch(url.toString(), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}

export const api = {
    get,
    post,
    patch,
};
