export interface IUser {
    id:string;
    username: string;
    email: string;
    password: string;
    access_token: string;
}

export type IPartialUser = Partial<IUser> | null;