import useController from "core/hooks/use-controller"
import Award from "./schema";
import Endpoints from "utils/endpoints";

const useAwardService = () => {
    const { request, loading } = useController();

    const createAward = async (data: Award) => {
        return request<Award, Award>({
            method: "POST",
            url: Endpoints.awards.create,
            data: data
        })
    }
    const getAwards = async () => {

        return request<unknown, Award[]>({
            url: Endpoints.awards.getAll
        });
    }

    return { loading, getAwards, createAward };
}

export default useAwardService;