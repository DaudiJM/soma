import useController from "core/hooks/use-controller";
import Endpoints from "utils/endpoints";
import { ChangePasswordInterface } from "utils/app-interfaces";
import { RecordsDto } from "utils/schema";
import { ChangeStatus } from "utils/schema/dto/dto";
import { PasswordReset } from "../authentication/schema";
import User from "./schema";

const useUserService = () => {
    const { request, loading } = useController();

    const createUser = async (data: User) => {
        return await request<User, User>({
            method: "POST",
            url: Endpoints.users.index,
            data: data,
        });
    }
    
    const updateUser = async (data: User) => {
        return await request<User, User>({
            method: "PUT",
            url: Endpoints.users.index,
            data: data,
        });
    }

    const changeUserStatus = async (data: ChangeStatus) => {
       return await request<ChangeStatus, User>({
            method: "POST",
            url: Endpoints.users.changeStatus,
            data: data,
        });
    }
    
    const resetUser = async (data: PasswordReset) => {
        return await request<PasswordReset, User>({
            method: "POST",
            url: Endpoints.users.reset,
            data: data,
        });
    }

    const getUser = async (id: number | string) => {
        return await request<unknown, User>({
            url: `${Endpoints.users.index}/${id}`
        });
    }

    const getUsers = async (params: object) => {
        return await request<unknown, User[]>({
            url: Endpoints.users.getAll,
            // params: params
        });
    }



    const changePassword = async (data: ChangePasswordInterface) => {
        return await request<ChangePasswordInterface, User>({
            method: "POST",
            url: Endpoints.users.changePassword,
            data: data,
        });
    }
    
    const searchUser = async (params : object) => {
        return await request<unknown, RecordsDto<User>>({
            url: "/user/search",
            params: params,
        });
    }

    return { loading, createUser, updateUser, changeUserStatus, changePassword, getUser, getUsers, searchUser, resetUser };
}

export default useUserService;