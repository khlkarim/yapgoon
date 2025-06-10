import { useState, type ReactNode } from "react";
import { UserContext } from "../contexts/UserContext";
import type { IPartialUser } from "../interfaces/entities/IUser";

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IPartialUser>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            { children }
        </UserContext.Provider>
    );
}