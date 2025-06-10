interface getParams {
    endpoint: string;
    params: object | null;
}

async function get({ endpoint, params }: getParams): Promise<object> {
    const url = new URL(endpoint, "http://localhost:3000");
    
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }
    
    const reponse = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return reponse.json();
}

interface postParams {
    endpoint: string;
    body: object;
}

async function post({ endpoint, body }: postParams): Promise<object> {
    const url = new URL(endpoint, "http://localhost:3000");

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    return response.json();
}

export const api = {
    get,
    post
}