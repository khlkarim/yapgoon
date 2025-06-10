import type { IUserContext } from "../contexts/UserContext";


interface getParams {
    endpoint: string;
    params: object;
}

export async function get({ endpoint, params }: getParams) {
    const url = new URL(endpoint, "http://localhost:3000");
    
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }
    
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    return response.json();
}

interface postParams {
    endpoint: string;
    body: object;
}

export async function post({ endpoint, body }: postParams) {
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



export async function registerUser({user, setUser}: IUserContext){
    if(user) { 
        const response = await post({
            endpoint:'/auth/register', 
            body: user
        });
        
        setUser({
            username: user.username,
            access_token: response.access_token
        }); 
    }
}

export async function loginUser({user, setUser}: IUserContext){
    if(user) {
        const response = await post({
            endpoint:'/auth/login', 
            body: user
        });
        
        setUser({
            username: user.username,
            access_token: response.access_token
        });
    } 
}