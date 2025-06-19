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
        const profile = await api.get({ endpoint: "users/profile" });
        const updatedUser = { ...(profile as IPartialUser), loggedIn: true } as IPartialUser;
        setUser(updatedUser);
        notify({ status: "success", message: "Logged In Successfully" });
        console.log(updatedUser);
    } catch {
        notify({ status: "error", message: "Failed To Login" });
    }
}

async function register({ user, setUser }: Params) {
    try {
        await api.post({ endpoint: "auth/register", body: user });
        const profile = await api.get({ endpoint: "users/profile" });
        const updatedUser = { ...(profile as IPartialUser), loggedIn: true } as IPartialUser;
        setUser(updatedUser);
        notify({ status: "success", message: "Registered Successfully" });
    } catch {
        notify({ status: "error", message: "Failed To Register" });
    }
}

async function editProfile({ user, setUser }: Params) {
    try {
        await api.patch({ endpoint: `users/${user.id}`, body: user });
        setUser(user);
        notify({ status: "success", message: "Profile Edited Successfully" });
    } catch {
        notify({ status: "error", message: "Failed To Edit Profile" });
    }
}

export const users = {
    login,
    register,
    editProfile,
};
