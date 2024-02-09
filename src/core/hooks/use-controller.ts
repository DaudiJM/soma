import axios from "axios";
import useToggle from "./use-toggle";
import Request, { AxiosConfig } from "../../utils/schema/api/request";
import Response from "../../utils/schema/api/response";
import { useAuth, useError, useSnackbar } from "./custom-hooks";

const URL = "http://localhost:8010/api";

const axiosInstance = axios.create({
    baseURL: URL
});

const useController = () => {
    const { token, user } = useAuth();
    const [loading, toggle] = useToggle();
    const { showAlert } = useSnackbar();
    const { showErrorOccured } = useError();
    const { isUserAuthenticated } = useAuth();
    
    const request = async <T, H> (props: AxiosConfig<T, H>) => {
        const { method = "GET", url, data, formData, params } = props;
        toggle();

        try {
            const res = await axiosInstance({
                url: url,
                method: method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                data: {
                    header: {
                        userId: 0
                    },
                    body: {
                        data: data,
                        userId: user?.id
                    }
                } as Request<T>,
                params: params
            })
            .then(response => {
                const data = response.data as Response<H>;
                if(method !== "GET"){
                    showAlert(data.header.responseMessage, "success");
                }

                console.log(data);
                
                return data;
            })
            .catch(errorResponse => {
                const data = errorResponse.response.body.data as Response<H>;
                showAlert(data.header.responseMessage, "error");
                if(isUserAuthenticated){
                    showErrorOccured(errorResponse.response.statusCode, data.header.responseMessage);
                }
                return data;
            });
            
            toggle();
            return res;
        }
        catch(Error){
            toggle();
            showAlert("Connection Failed. Please try again later", "error");
            return {
                header: {
                    responseCode: "1",
                    responseStatus: "failed",
                    responseMessage: "Connection Failed"
                },
                body: {
                    data: {} as H
                }
            } as Response<H>;
        }
    }

    return { request, loading }
}

export default useController;