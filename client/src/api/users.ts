import type { Dispatch, SetStateAction } from "react";
import type { IPartialUser } from "../types/IUser";
import { api } from "./methods";
import { notify } from "../utils/notify";

interface Params {
    user: IPartialUser;
    setUser: Dispatch<SetStateAction<IPartialUser>>;
}

async function login({ user, setUser }: Params) {
    try {
        await api.post({ endpoint: "auth/login", body: user });
        
        let profile = await api.get({ endpoint: "users/profile" }) as IPartialUser;
        profile = { ...profile, loggedIn: true };

        setUser(profile);
        notify({ status: "success", message: "Logged In Successfully" });
        console.log(profile);
        return true;
    } catch {
        notify({ status: "error", message: "Failed To Login" });
        return false;
    }
}

async function register({ user, setUser }: Params) {
    try {
        await api.post({ endpoint: "auth/register", body: user });

        let profile = await api.get({ endpoint: "users/profile" }) as IPartialUser;
        profile = { ...profile, loggedIn: true };

        setUser(profile);
        notify({ status: "success", message: "Registered Successfully" });
        return true;
    } catch {
        notify({ status: "error", message: "Failed To Register" });
        return false;
    }
}

async function editProfile({ user, setUser }: Params) {
    try {
        await api.patch({ endpoint: `users/${user.id}`, body: user });
        
        let profile = await api.get({ endpoint: "users/profile" }) as IPartialUser;
        profile = { ...profile, loggedIn: true };

        setUser(profile);
        notify({ status: "success", message: "Profile Edited Successfully" });
    } catch {
        notify({ status: "error", message: "Failed To Edit Profile" });
    }
}

async function logout({ setUser }: { setUser: Dispatch<SetStateAction<IPartialUser>> }) {
    try {
        await api.post({ endpoint: "auth/logout" });        
        setUser({loggedIn: false});
        notify({ status: "success", message: "Logged Out Successfully" });
    } catch {
        notify({ status: "error", message: "Failed To Logout" });
    }
}

export const users = {
    login,
    register,
    editProfile,
    logout,
};
