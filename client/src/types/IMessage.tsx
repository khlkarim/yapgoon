import type { IPartialChannel } from "./IChannel";
import type { IPartialUser } from "./IUser";

export interface IMessage {
    id: number;
    content: string;
    createdAt: Date;
    channel: IPartialChannel;
    owner: IPartialUser;
}

export type IPartialMessage = Partial<IMessage>;