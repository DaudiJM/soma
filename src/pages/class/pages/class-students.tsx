import Box from "@mui/material/Box";
import { GridCellParams, GridColDef, GridPaginationModel } from "@mui/x-data-grid/models";
import Actions from "core/components/Actions";
import CCard from "core/components/Cards";
import Status from "core/components/Status";
import DataTable from "core/components/data-table";
import usePage from "core/hooks/use-page-state";
import Student from "pages/student/schema";
import useStudentService from "pages/student/student-service";
import { useEffect } from "react";
import { Action, EntityStatus, PAGE_STATE_ACTIONS, Role } from "utils/enums";

const ClassStudentsPage = ({id}: {id: number | string}) => {

    const [state, dispatch] = usePage<Student>(EntityStatus.ACTIVE);
    const { getClassStudents } = useStudentService();

    const loadPage = async () => {
        const response = await getClassStudents(id);
        if(response.header.responseCode === "0"){
            dispatch({action: PAGE_STATE_ACTIONS.SET_RECORDS, payload: response.body.data.length});
            dispatch({action: PAGE_STATE_ACTIONS.SET_ROWS, payload: response.body.data});
        }
    }

    const onPagechange = (model: GridPaginationModel) => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: model});
    }

    const handleActions = (action: Action, params: GridCellParams<any, any, any>) => {
        const user: Student = params.row;
        let status: EntityStatus = EntityStatus.DEFAULT;
        dispatch({action: PAGE_STATE_ACTIONS.SET_DATA, payload: user});

        switch(action){
            case Action.Update:
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: "Update student"});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CREATE});
                break;
            case Action.Delete:
                status = EntityStatus.DELETED;
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: `Are you sure you want to delete student, ${user.firstName} ?`});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION});
                break;
            case Action.Activate:
                status = EntityStatus.ACTIVE;
                dispatch({action: PAGE_STATE_ACTIONS.SET_TITLE, payload: `Are you sure you want to activate student, ${user.firstName} ?`});
                dispatch({action: PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION});
                break;
            default:
                // go(getDetailsRoute(routes.users.details, user?.id));
        }
        
        dispatch({action: PAGE_STATE_ACTIONS.SET_TARGET, payload: { id: user?.id, status: status}});
    }

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
            field: 'registrationNumber',
            headerName: "Reg No.",
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
                    roles={[Role.ADMINISTRATOR, ]} 
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
        loadPage();
    }, []);

    return(
        <Box>
            <CCard 
                title="Students"
                hideBackButton
                children={
                    <DataTable 
                        columns={columns}
                        rows={state.rows}
                        model={state.paginationModel}
                        records={state.records}
                        onPagechange={onPagechange}
                    />
                }
            />
        </Box>
    );
}

export default ClassStudentsPage;