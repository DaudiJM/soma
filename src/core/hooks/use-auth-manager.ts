import { useAuth, useRouter } from "./custom-hooks";
import Response from "../../utils/schema/api/response";
import User from "pages/user/schema";
import routes from "utils/routes";

const useAuthManager = () => {
    const { setToken, setAuthState, setUser } = useAuth();
    const { back, go, route } = useRouter();

    const authenticate = (response: Response<User>) => {

        if(response.header.responseCode === "0"){
            setToken(response.header?.token ?? "");
            setAuthState(true);
            setUser(response.body.data);
            // if(route == null){
            //     back();
            // } else {
            //     go(route != routes.index ? route : routes.dashboard);
            // }
            go(routes.dashboard);

            return;
        }

        logout();
    }


    const logout = () => {
        setAuthState(false);
        localStorage.removeItem("user");
        go(routes.index);
    }


    return { logout, authenticate };
}

export default useAuthManager;