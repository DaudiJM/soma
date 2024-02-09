import useController from "core/hooks/use-controller"
import Module from "./schema";
import Endpoints from "utils/endpoints";
import { StaffModule } from "pages/staff/schema";

const useModuleService = () => {
    const { loading, request } = useController();

    const createModule =  async (data: Module) => {
        return await request<Module, Module>({
            url: Endpoints.modules.create,
            method: "POST",
            data: data
        });
    }

    const getModules = async () => {
        return await request<unknown, Module[]>({
            url: Endpoints.modules.getAll
        });
    }

    const assignLecturer = async (data: StaffModule) => {
        return await request<StaffModule, StaffModule>({
            method: 'POST',
            data: data,
            url: Endpoints.modules.assign
        });
    }

    const getDepartmentModules = async (id: number | string) => {
        return await request<unknown, Module[]>({
            url: Endpoints.modules.getAll + "/" + id
        })
    }

    const getLecturerClassModule = async (classId: number, lecturerId: number) => {
        return await request<unknown, Module>({
            url: Endpoints.modules.index + `/lecturer/${lecturerId}/class/${classId}`
        })
    }

    const getModule = async (id: number | string) => {
        return await request<unknown, Module>({
            url: Endpoints.modules.index + "/" + id
        });
    }

    return { loading, getModules, createModule, assignLecturer, getDepartmentModules, getLecturerClassModule, getModule };
}

export default useModuleService;