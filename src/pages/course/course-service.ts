import useController from "core/hooks/use-controller"
import Course from "./schema";
import Endpoints from "utils/endpoints";

const useCourseService = () => {
    const { loading, request } = useController();

    const createCourse = async (data: Course) => {
        return request<Course, Course>({
            url: Endpoints.course.create,
            method: "POST",
            data: data
        })
    }

    const updateCourse = async (data: Course) => {
        return request<Course, Course>({
            url: Endpoints.course.create,
            method: "POST",
            data: data
        })
    }

    const getCourses = async () => {
        return request<unknown, Course[]>({
            url: Endpoints.course.getAll
        });
    }

    const getCourse = async (id: string | number) => {
        return await request<unknown, Course>({
            url: Endpoints.course.index + id
        });
    }

    return { loading, getCourses, createCourse, getCourse, updateCourse };
}

export default useCourseService;