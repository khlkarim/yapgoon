export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    loggedIn: boolean;
}

export type IPartialUser = Partial<IUser>;