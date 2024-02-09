import useController from "core/hooks/use-controller";
import Application from "./schema";
import Endpoints from "utils/endpoints";
import Student from "pages/student/schema";

const useApplicationService = () => {
    const { loading, request } = useController();

    const apply = async (data: Application) => {
        return await request<Application, Application>({
            url: Endpoints.application.apply,
            data: data,
            method: "POST",
        });
    };

    const getApplications = async () => {
        return await request<unknown, Application[]>({
            url: Endpoints.application.getAll
        });
    }

    const enrollStudents = async (selected: number[]) => {
        return await request<number[], Student[]>({
            method: "POST",
            url: Endpoints.application.enroll,
            data: selected
        });
    }
    return { getApplications, apply, loading, enrollStudents }
}

export default useApplicationService;