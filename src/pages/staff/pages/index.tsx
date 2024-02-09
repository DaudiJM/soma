import usePage from "core/hooks/use-page-state";
import useStaffService from "../staff-service";
import Staff from "../schema";
import { Action, EntityStatus, PAGE_STATE_ACTIONS, Role } from "utils/enums";
import { GridCellParams, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Status from "core/components/Status";
import Actions from "core/components/Actions";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import DataTable from "core/components/data-table";
import Wrapper from "core/components/Wrapper";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { ActionButton } from "core/components/utility-components";
import { getDetailsRoute, shouldAllow } from "utils/Utils";
import AddIcon from '@mui/icons-material/Add';
import { useAuth, useRouter } from "core/hooks/custom-hooks";
import routes from "utils/routes";

const StaffPage = () => {
    const { user } = useAuth();
    const { go } = useRouter();
    const { getStaffList } = useStaffService();
    const [state, dispatch] = usePage<Staff>(EntityStatus.PENDING);

    const loadData = async () => {
        const response = await getStaffList();
        if(response.header.responseCode === "0"){
            dispatch({action: PAGE_STATE_ACTIONS.SET_RECORDS, payload: response.body.data.length});
            dispatch({action: PAGE_STATE_ACTIONS.SET_ROWS, payload: response.body.data});
        }
    }

    const onPagechange = (model: GridPaginationModel) => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: model});
    }
    
    const handleActions = (action: Action, params: GridCellParams<any, any, any>) => {
        const staff: Staff = params.row;
        let status: EntityStatus = EntityStatus.DEFAULT;
        dispatch({action: PAGE_STATE_ACTIONS.SET_DATA, payload: staff});

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
                go(getDetailsRoute(routes.staff.details, staff?.id));
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
                        title="Add Staff" 
                        onClick={() => go(routes.staff.add)} 
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
            renderCell: (params) => `${params.row.firstName} ${params.row.middleName} ${params.row.lastName}`
        },
        {
            field: 'gender',
            headerName: "Gender",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'department',
            headerName: "Department",
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
                title="Staff"
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

export default StaffPage;