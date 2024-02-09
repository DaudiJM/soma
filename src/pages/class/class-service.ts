import useController from "core/hooks/use-controller"
import Class from "./schema";
import Endpoints from "utils/endpoints";

const useClassService = () => {
    const { loading, request } = useController();

    const createClass = async (data: Class) => {
        return await request<Class, Class>({
            url: Endpoints.classes.create,
            method: "POST",
            data: data
        });
    }

    const getClasses = async () => {
        return await request<unknown, Class[]>({
            url: Endpoints.classes.getAll
        });
    }

    const getClass = async (id: number | string) => {
        return await request<unknown, Class>({
            url: Endpoints.classes.index + id
        });
    }

    return { loading, getClasses, createClass, getClass };
}

export default useClassService;