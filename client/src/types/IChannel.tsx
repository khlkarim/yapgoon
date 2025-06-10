export interface IChannel {
    id: number;
    name:string;
    description: string;
    status: boolean;
    createdAt: Date;
}

export type IPartialChannel = Partial<IChannel> | null;