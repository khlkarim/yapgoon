import { useState, type ReactNode } from "react";
import { UserContext } from "../contexts/UserContext";
import type { IPartialUser } from "../types/IUser";

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IPartialUser>({ loggedIn: false });

    return (
        <UserContext.Provider value={{user, setUser}}>
            { children }
        </UserContext.Provider>
    );
}