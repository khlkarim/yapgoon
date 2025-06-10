import type { Dispatch, SetStateAction } from "react";

export interface IUser {
    username: string;
    email: string;
    access_token: string;
}

export type IPartialUser = Partial<IUser> | null;

export interface IUserContext {
    user: IPartialUser;
    setUser: Dispatch<SetStateAction<IPartialUser>> | null
}