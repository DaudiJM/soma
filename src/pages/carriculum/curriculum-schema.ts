import useController from "core/hooks/use-controller"
import CourseCurriculum from "./schema";
import Endpoints from "utils/endpoints";

const useCurriculumService = () => {
    const { request, loading } = useController();

    const getCourseCurriculum = async (id: string | number) => {
        return await request<unknown, CourseCurriculum>({
            url: Endpoints.carriculum.course + id,
        });
    }

    const setCourseCurriculum = async (data: CourseCurriculum) => {
        return await request<CourseCurriculum, CourseCurriculum>({
            url: Endpoints.carriculum.set,
            method: "POST",
            data: data,
        });
    }

    return { getCourseCurriculum, loading, setCourseCurriculum };
}

export default useCurriculumService;