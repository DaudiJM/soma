import useController from "core/hooks/use-controller"
import Student from "./schema";
import Endpoints from "utils/endpoints";

const useStudentService = () => {
    const { request, loading } = useController();

    const getStudents = async () => {
        return request<unknown, Student[]>({
            url: Endpoints.students.getAll
        });
    }

    const getClassStudents = async (id: number | string) => {
        return await request<unknown, Student[]>({
            url: Endpoints.students.getAll + "/" + id
        })
    }

    return { getStudents, loading, getClassStudents };
}

export default useStudentService;