import Box from "@mui/material/Box"
import { GridCellParams, GridColDef, GridPaginationModel } from "@mui/x-data-grid/models";
import CCard from "core/components/Cards";
import Status from "core/components/Status";
import DataTable from "core/components/data-table";
import usePage from "core/hooks/use-page-state";
import { Action, EntityStatus, PAGE_STATE_ACTIONS, Role } from "utils/enums";
import Application from "../schema";
import Actions from "core/components/Actions";
import { ActionButton } from "core/components/utility-components";
import useApplicationService from "../application-service";
import { useEffect, useState } from "react";
import { TSelected } from "utils/schema";
import Wrapper from "core/components/Wrapper";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { shouldAllow } from "utils/Utils";
import AddIcon from '@mui/icons-material/Add';
import { useAuth, useRouter } from "core/hooks/custom-hooks";
import routes from "utils/routes";
import Button from "@mui/material/Button";

const ApplicationPage = () => {
    const { user } = useAuth();
    const { go } = useRouter();
    const [selected, setSelected] = useState<TSelected>([]);
    const { getApplications, enrollStudents } = useApplicationService();
    const [state, dispatch] = usePage<Application>(EntityStatus.PENDING);

    const loadData = async () => {
        const response = await getApplications();
        if(response.header.responseCode === "0"){
            dispatch({action: PAGE_STATE_ACTIONS.SET_RECORDS, payload: response.body.data.length});
            dispatch({action: PAGE_STATE_ACTIONS.SET_ROWS, payload: response.body.data});
        }
    }

    const onPagechange = (model: GridPaginationModel) => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: model});
    }

    const handleErrolment = async () => {
        const response = await enrollStudents(state?.selected as number[]);
        if(response.header.responseCode === "0"){
            loadData();
        }
    }
    
    const handleActions = (action: Action, params: GridCellParams<any, any, any>) => {
        const user: Application = params.row;
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

    const onSelectionChange = (selcted: TSelected) => {
        setSelected(selcted);
        dispatch({action: PAGE_STATE_ACTIONS.SET_SELECTED, payload: selcted});
    }

    const selectedActions = (
        <Wrapper>
            <Button onClick={handleErrolment}>Enroll Student</Button>
        </Wrapper>
    )

    const actions = (
        <Wrapper>
            <ActionButton 
                icon={RefreshOutlinedIcon} 
                onClick={loadData} 
                title="Refresh Page"
            />
            {shouldAllow(user?.roles[0], [Role.ADMINISTRATOR,]) 
                && <ActionButton 
                        title="Add Application" 
                        onClick={() => go(routes.application.add)} 
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
            field: 'course',
            headerName: "Course",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'category',
            headerName: "Category",
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
                title="Applications"
                hideBackButton
                actions={state?.selected?.length > 0 ? selectedActions : actions}
                children={
                    <DataTable 
                        columns={columns}
                        rows={state.rows}
                        model={state.paginationModel}
                        onPagechange={onPagechange}
                        records={state.records}
                        enableSelection
                        onSelectionChange={onSelectionChange}
                    />
                }
            />
        </Box>
    );
}

export default ApplicationPage;