import { PropsWithChildren, createContext, useState } from "react";
import { AuthStateInterface, } from "../../utils/app-interfaces";
import User from "pages/user/schema";
import { useLocalStorage } from "core/hooks/useLocalStorage";

export const AuthContext = createContext({ isUserAuthenticated: true } as AuthStateInterface);

const AuthProvider:React.FC<PropsWithChildren> = ({ children }) => {
    const [isUserAuthenticated, setAuthState] = useState<boolean>(localStorage.getItem("isAuthenticated") === "true" ? true : false);
    const [roles, setRoles] = useState<string[]>([]);
    const [user, setUser] = useLocalStorage<User>("user", {} as User);
    const [token, setToken] = useState<string>("");


    return(
        <AuthContext.Provider value={{ isUserAuthenticated, roles, setAuthState, setRoles, user, setUser, token, setToken}}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;