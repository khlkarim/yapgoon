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
            user.access_token = data.access_token;
            setUser(user);
        });
    }
    
}

function register({user, setUser}: Params) {
    if(user) {
        api.post({endpoint: 'auth/register', body: (user as object)})
        .then((data) => {
            user.access_token = data.access_token;
            setUser(user);
        });
    }
}

function editProfile({user, setUser}: Params) {
    if(user) {
        api.post({endpoint: 'auth/edit-profile', body: (user as object)})
        .then((data) => {
            user.access_token = data.access_token;
            setUser(user);
        });
    }
}

export const users = {
    login,
    register,
    editProfile
}