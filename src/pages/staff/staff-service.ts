import useController from "core/hooks/use-controller";
import Staff, { StaffModule, StaffRole } from "./schema";
import Endpoints from "utils/endpoints";

const useStaffService = () => {
    const { loading, request } = useController();

    const createStaff = async (data: Staff) => {
        return await request<Staff, Staff>({
            url: Endpoints.staff.create,
            method: 'POST',
            data: data
        });
    }

    const getStaffList = async () => {
        return await request<unknown, Staff[]>({
            url: Endpoints.staff.getAll
        });
    }

    const assignRoles = async (data: StaffRole) => {
        return await request<StaffRole, StaffRole>({
            url: Endpoints.staff.assign,
            method: 'POST',
            data: data
        })
    }

    const getStaff = async (id: string | number) => {
        return await request<unknown, Staff>({
            url: Endpoints.staff.index + id
        });
    }

    return { loading, getStaffList, createStaff, assignRoles, getStaff };
}

export default useStaffService;