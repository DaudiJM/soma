import useController from "core/hooks/use-controller"
import Grade from "./schema";
import Endpoints from "utils/endpoints";

const useGradeService = () => {
    const { loading, request } = useController();

    const createGrade = async (data: Grade) => {

        return request<Grade, Grade>({
            url: Endpoints.grades.create,
            data: data,
            method: "POST"
        });
    }
    const getGrades = async () => {
        return request<unknown, Grade[]>({
            url: Endpoints.grades.getAll,
        });
    }

    return { loading, getGrades, createGrade };
}

export default useGradeService;