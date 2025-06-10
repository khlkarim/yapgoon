import { createContext } from "react";
import type { IUserContext } from "../interfaces/entities/IUser";

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {}
});