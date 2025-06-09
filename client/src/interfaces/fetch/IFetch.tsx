export interface IFetch {
    data: Array<object> | null;
    isLoading: boolean;
    error: string | null;
}