import useController from "core/hooks/use-controller";
import Endpoints from "utils/endpoints";

const useAuthenticationService = () => {
    const { request, loading } = useController();

    const authenticateUser = async <TAuthentication, User>(data: TAuthentication) => {
        return await request<TAuthentication, User>({
            url: Endpoints.authentication.index,
            method: "POST",
            data: data
        });
    }

    return { authenticateUser, loading };
}

export default useAuthenticationService;