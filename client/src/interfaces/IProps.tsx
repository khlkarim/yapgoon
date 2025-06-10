import type { IPartialChannel } from "./entities/IChannel";

export interface ListProps {
    filters: IPartialChannel
}

export interface useFetchProps {
    endpoint: string | null;
    method: string | null;
    payload: object | null;
}

export interface FilterProps extends ListProps {
    filterList: (filters: IPartialChannel) => void
}