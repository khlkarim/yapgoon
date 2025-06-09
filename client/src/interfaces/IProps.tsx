import type { IPartialChannel } from "./entities/IChannel";

export interface ListProps {
    filters: IPartialChannel
}

export interface useFetchProps {
    uri: string;
    filters: IPartialChannel;
}

export interface FilterProps extends ListProps {
    filterList: (filters: IPartialChannel) => void
}