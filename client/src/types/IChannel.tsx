export interface IChannel {
    id: number;
    name:string;
    description: string;
    status: boolean;
    owner: string;
    createdAt: Date;
}

export type IPartialChannel = Partial<IChannel> | null;