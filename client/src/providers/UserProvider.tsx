import { useState, type ReactNode } from "react";
import type { IPartialUser } from "../interfaces/entities/IUser";
import { UserContext } from "../contexts/UserContext";

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IPartialUser>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            { children }
        </UserContext.Provider>
    );
}