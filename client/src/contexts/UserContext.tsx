import { createContext, type Dispatch, type SetStateAction } from "react";
import type { IPartialUser } from "../types/IUser";

export interface IUserContext {
    user: IPartialUser,
    setUser: Dispatch<SetStateAction<IPartialUser>>
}

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {}
});