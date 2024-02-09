import usePage from "core/hooks/use-page-state"
import Department from "../schema"
import { Action, EntityStatus, PAGE_STATE_ACTIONS, Role } from "utils/enums"
import useDepartmentService from "../department-service";
import DataTable from "core/components/data-table";
import CCard from "core/components/Cards";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Actions from "core/components/Actions";
import Status from "core/components/Status";
import { GridCellParams, GridColDef, GridPaginationModel } from "@mui/x-data-grid/models";
import Wrapper from "core/components/Wrapper";
import { ActionButton } from "core/components/utility-components";
import { shouldAllow } from "utils/Utils";
import AddIcon from '@mui/icons-material/Add';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { useAuth, useRouter } from "core/hooks/custom-hooks";
import routes from "utils/routes";

const DepartmentsPage = () => {
    const { go } = useRouter();
    const { user } = useAuth();
    const [state, dispatch] = usePage<Department>(EntityStatus.ACTIVE);
    const { loading, getDepartments } = useDepartmentService();

    const loadData = async () => {
        const response = await getDepartments();
        if(response.header.responseCode === "0"){
            dispatch({action: PAGE_STATE_ACTIONS.SET_RECORDS, payload: response.body.data.length});
            dispatch({action: PAGE_STATE_ACTIONS.SET_ROWS, payload: response.body.data});
        }
    }

    const onPagechange = (model: GridPaginationModel) => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: model});
    }
    
    const handleActions = (action: Action, params: GridCellParams<any, any, any>) => {
        const user: Department = params.row;
        let status: EntityStatus = EntityStatus.DEFAULT;
        dispatch({action: PAGE_STATE_ACTIONS.SET_DATA, payload: user});

        switch(action){
            case Action.Update:
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: "Update User"});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CREATE});
                break;
            case Action.Delete:
                status = EntityStatus.DELETED;
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: `Are you sure you want to delete user,  ?`});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION});
                break;
            case Action.Activate:
                status = EntityStatus.ACTIVE;
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: `Are you sure you want to activate user, ?`});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION});
                break;
            default:
                // go(getDetailsRoute(routes.users.details, user?.id));
        }
        
        dispatch({action: PAGE_STATE_ACTIONS.SET_TARGET, payload: { id: 1, status: status}});
    }
    
    const actions = (
        <Wrapper>
            <ActionButton 
                icon={RefreshOutlinedIcon} 
                onClick={loadData} 
                title="Refresh Page"
            />
            {!shouldAllow(user?.roles[0], [Role.ADMINISTRATOR, ]) 
                && <ActionButton 
                        title="Add Department" 
                        onClick={() => go(routes.department.add)} 
                        icon={AddIcon}
                    />
            }
        </Wrapper>
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
            field: 'name',
            headerName: "Name",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'code',
            headerName: "Code",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'hod',
            headerName: "HOD",
            editable: false,
            minWidth: 120,
            flex: 1,
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
                    roles={[]} 
                    params={params}
                    entity="User"
                    actionHandler={handleActions}
                    actions={[
                        // params.row.status !== EntityStatus.ACTIVE && <ActionButton title="Activate User" icon={CheckOutlinedIcon} onClick={() => handleActions(Action.Activate, params)}/>
                    ]}
                />
        }
    ];

    useEffect(() => {
        loadData();

        return () => {};

    }, []);
    
    return(
        <Box>
            <CCard 
                title="Departments"
                hideBackButton
                actions={actions}
                children={
                    <DataTable 
                        columns={columns}
                        rows={state.rows}
                        model={state.paginationModel}
                        onPagechange={onPagechange}
                        records={state.records}
                    />
                }
            />
        </Box>
    );
}

export default DepartmentsPage;