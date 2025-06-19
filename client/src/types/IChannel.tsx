import type { IPartialUser } from "./IUser";

export interface IChannel {
    id: number;
    name:string;
    description: string;
    public: boolean;
    owner: IPartialUser;
    createdAt: Date;
}

export type IPartialChannel = Partial<IChannel>;