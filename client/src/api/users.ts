import type { Dispatch, SetStateAction } from "react";
import type { IPartialUser } from "../types/IUser"
import { api } from "./methods";

interface Params {
    user: IPartialUser;
    setUser: Dispatch<SetStateAction<IPartialUser>>
}

function login({user, setUser}: Params) {
    if(user) {
        api.post({endpoint: 'auth/login', body: (user as object)})
        .then((data) => {
            user.email = data.email;
            user.access_token = data.access_token;
            setUser(user);
        }).catch((error) => {
            alert(error);
        });
    }
    
}

function register({user, setUser}: Params) {
    if(user) {
        api.post({endpoint: 'auth/register', body: (user as object)})
        .then((data) => {
            user.access_token = data.access_token;
            setUser(user);
        }).catch((error) => {
            alert(error);
        });
    }
}

function editProfile({user, setUser}: Params) {
    if(user) {
        api.patch({endpoint: 'users/'+user.id, body: (user as object)})
        .then((data) => {
            user.access_token = data.access_token;
            setUser(user);
        }).catch((error) => {
            alert(error);
        }); 
    }
}

export const users = {
    login,
    register,
    editProfile
}