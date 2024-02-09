import useController from "core/hooks/use-controller"
import Department from "./schema";
import Endpoints from "utils/endpoints";

const useDepartmentService = () => {
    const {loading, request} = useController();
    
    const createDepartment = async (data: Department) => {
        return request<Department, Department>({
            url: Endpoints.departments.create,
            method: 'POST',
            data: data
        })
    }
    const getDepartments = async () => {

        return request<unknown, Department[]>({
            url: Endpoints.departments.getAll
        });
    }

    const getDepartment = async (id: string | number) => {
        return await request<unknown, Department>({
            url: Endpoints.departments.index + id
        })
    }

    return { loading, getDepartments, createDepartment, getDepartment };
}

export default useDepartmentService;