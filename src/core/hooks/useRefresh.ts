import useAuthManager from "./use-auth-manager";
import { useEffect } from "react";
import useController from "./use-controller";
import Endpoints from "../../utils/endpoints";
import User from "pages/user/schema";

const useRefresh = () => {
    const { authenticate } = useAuthManager();
    const { request } = useController();

    const refresh = async () => {
        authenticate(await request<unknown, User>({
            method: "POST",
            url: Endpoints.authentication.refresh,
            data: {}
        }));
    }

    useEffect(() => {
        refresh();
    }, []);

}

export default useRefresh;