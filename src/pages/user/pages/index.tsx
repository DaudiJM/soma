import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import { Action, EntityStatus, PAGE_STATE_ACTIONS, Role } from "utils/enums";
import { useEffect } from "react";
import CreateUser from "./create-update";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextField from "@mui/material/TextField";
import { GridCellParams, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import ConfirmDialog from "core/components/ConfirmDialog";
import useFormManager from "core/hooks/use-form";
import { useAuth, useRouter } from "core/hooks/custom-hooks";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import useUserService from "../user-service";
import Status from "core/components/Status";
import Actions from "core/components/Actions";
import usePage from "core/hooks/use-page-state";
import Wrapper from "core/components/Wrapper";
import DataTable from "core/components/data-table";
import { ActionButton } from "core/components/utility-components";
import User from "../schema";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { getDetailsRoute, shouldAllow } from "utils/Utils";
import routes from "utils/routes";
import AddIcon from '@mui/icons-material/Add';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import GroupIcon from '@mui/icons-material/Group';

const UsersPage = () => {
    const [state, dispatch] = usePage<User>(EntityStatus.ACTIVE);
    const { getUsers, changeUserStatus, searchUser, loading } = useUserService();
    const { user } = useAuth();
    const { go } = useRouter();
    const { formState, handleChange } = useFormManager({initialState: {query: ""}});

    const loadData = async () => {
        const response = await getUsers({ 
            page: state.paginationModel.page, 
            size: state.paginationModel.pageSize,
            status: state.status,
            merchantId: state?.data?.merchantId, 
        });

        dispatch({action: PAGE_STATE_ACTIONS.SET_ROWS, payload: response.body.data});
        dispatch({action: PAGE_STATE_ACTIONS.SET_RECORDS, payload: response.body.data.length});
    }

    const reload = () => {
        if(state.create && state.data?.id > 0){
            dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CREATE});
        }

        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: { page: 0, pageSize: 5}});
    }

    const handleCreate = () => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_DATA, payload: {} as typeof state.data});
        dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: "Add New User"});
        dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CREATE});
    }

    const view = (status: EntityStatus) => () => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_STATUS, payload: status});
        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: { page: 0, pageSize: 5}});
    }

    const changeStatus =  async () => {
        await changeUserStatus(state.target);
        handleClose();
        loadData();
    }

    const onPagechange = (model: GridPaginationModel) => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: model});
    }

    const handleClose = () => {
        if(state.create){
            dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CREATE})
        }

        if(state.showAlert){
            dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION})
        }
    }

    const search = async () => {}

    const handleActions = (action: Action, params: GridCellParams<any, any, any>) => {
        const user: User = params.row;
        let status: EntityStatus = EntityStatus.DEFAULT;
        dispatch({action: PAGE_STATE_ACTIONS.SET_DATA, payload: user});

        switch(action){
            case Action.Update:
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: "Update User"});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CREATE});
                break;
            case Action.Delete:
                status = EntityStatus.DELETED;
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: `Are you sure you want to delete user, ${user.name} ?`});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION});
                break;
            case Action.Activate:
                status = EntityStatus.ACTIVE;
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: `Are you sure you want to activate user, ${user.name} ?`});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION});
                break;
            default:
                go(getDetailsRoute(routes.users.details, user?.id));
        }
        
        dispatch({action: PAGE_STATE_ACTIONS.SET_TARGET, payload: { id: user?.id, status: status}});
    }

    const actions = (
        <Wrapper>
            <ActionButton 
                icon={RefreshOutlinedIcon} 
                onClick={reload} 
                title="Refresh Page"
            />
            {shouldAllow(user?.roles[0], [Role.ADMINISTRATOR, ]) 
                && <ActionButton 
                        title="Add User" 
                        onClick={handleCreate} 
                        icon={AddIcon}
                    />
            }
            {!shouldAllow(state?.status, [EntityStatus.ACTIVE]) 
                && <ActionButton 
                        title="Active Users" 
                        icon={GroupIcon} 
                        onClick={view(EntityStatus.ACTIVE)}
                    />
            }
            {!shouldAllow(state?.status, [EntityStatus.DISABLED]) 
                && <ActionButton 
                        title="Disabled Users" 
                        icon={DoDisturbOnIcon} 
                        onClick={view(EntityStatus.DISABLED)}
                    />
            }
            {!shouldAllow(state.status, [EntityStatus.DELETED]) 
                && <ActionButton 
                        title="Deleted Users" 
                        icon={DeleteSweepIcon} 
                        onClick={view(EntityStatus.DELETED)}
                    />
            }
            <ActionButton 
                icon={SearchOutlinedIcon}
                onClick={() => dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_SEARCH})}
                title="Search Users"
            />
        </Wrapper>
    );

    const searchActions = (
        <Stack direction="row">
            <TextField
                placeholder="Search...."
                fullWidth
                size="small"
                name="query"
                value={formState.query}
                onChange={handleChange}
                InputProps={{
                    endAdornment : <ActionButton title="Search" icon={SearchOutlinedIcon} onClick={search}/>
                }}
                sx={{ mr: 1}}
            />
            <ActionButton 
                icon={CloseIcon}
                onClick={() => dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_SEARCH})}
                title="Close Search"
            />
        </Stack>
    );

    const createActions = (
        <>
            <ActionButton
                icon={CloseIcon}
                title="Close"
                onClick={() => dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CREATE})}
            />
        </>
    );
    
    const columns:GridColDef[] = [
        {
            field: 'sn',
            headerName: "SN",
            editable: false,
            width: 70,
            renderCell: (index) => (index.api.getRowIndexRelativeToVisibleRows(index.id) + 1) + (state.paginationModel.page * state.paginationModel.pageSize)
        },
        {
            field: 'username',
            headerName: "Username",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'email',
            headerName: "Email",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'role',
            headerName: "Role",
            editable: false,
            minWidth: 120,
            flex: 1,
            renderCell: (params) => `${params.row.userRoles}`
        },
        {
            field: "status",
            headerName: "Status",
            editable: false,
            flex: 1,
            renderCell: (params) => <Status status={params.row.status}/>
        },
        {
            field: "actions",
            headerName: "Actions",
            editable: false,
            minWidth: 150,
            flex: 1,
            renderCell: (params) => 
                <Actions 
                    roles={[Role.ADMINISTRATOR, ]}
                    params={params}
                    entity="User"
                    actionHandler={handleActions}
                    actions={[
                        params.row.status !== EntityStatus.ACTIVE && <ActionButton title="Activate User" icon={CheckOutlinedIcon} onClick={() => handleActions(Action.Activate, params)}/>
                    ]}
                />
        }
    ];

    useEffect(() => {
        loadData();
        return () => {}

    }, [state.paginationModel, state.status]);

    return(
        <Box>
            {state.create ? 
                <CCard
                    title={state?.title}
                    actions={createActions}
                    hideBackButton
                    children={
                        <CreateUser 
                            data={state.data} 
                            reload={reload}
                        />
                    }
                />
            :
            <CCard 
                title={"Users"} 
                subtext={state.status}
                actions={state.search ? searchActions : actions}
            >
                <DataTable 
                    columns={columns}
                    rows={state.rows}
                    onPagechange={onPagechange}
                    model={state?.paginationModel}
                    records={state.records}
                    loading={loading}
                />
            </CCard>}
            <ConfirmDialog 
                open={state?.showAlert} 
                onClose={handleClose} 
                title={state?.title} 
                onConfirm={changeStatus}
                loading={loading}
            />
        </Box>
    );
}

export default UsersPage;