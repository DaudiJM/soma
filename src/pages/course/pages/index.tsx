import Box from "@mui/material/Box";
import { GridCellParams, GridColDef, GridPaginationModel } from "@mui/x-data-grid/models";
import Actions from "core/components/Actions";
import CCard from "core/components/Cards";
import Status from "core/components/Status";
import DataTable from "core/components/data-table";
import { useEffect } from "react";
import { Action, EntityStatus, PAGE_STATE_ACTIONS, Role } from "utils/enums";
import Course from "../schema";
import usePage from "core/hooks/use-page-state";
import useCourseService from "../course-service";
import Wrapper from "core/components/Wrapper";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { ActionButton } from "core/components/utility-components";
import { getDetailsRoute, shouldAllow } from "utils/Utils";
import AddIcon from '@mui/icons-material/Add';
import { useAuth, useRouter } from "core/hooks/custom-hooks";
import routes from "utils/routes";

const CoursesPage = () => {
    const { user } = useAuth();
    const { go } = useRouter();
    const { getCourses } = useCourseService();
    const [state, dispatch] = usePage<Course>(EntityStatus.PENDING);

    const loadData = async () => {
        const response = await getCourses();
        if(response.header.responseCode === "0"){
            dispatch({action: PAGE_STATE_ACTIONS.SET_RECORDS, payload: response.body.data.length});
            dispatch({action: PAGE_STATE_ACTIONS.SET_ROWS, payload: response.body.data});
        }
    }

    const onPagechange = (model: GridPaginationModel) => {
        dispatch({action: PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL, payload: model});
    }
    
    const handleActions = (action: Action, params: GridCellParams<any, any, any>) => {
        const user: Course = params.row;
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
                go(getDetailsRoute(routes.courses.details, user?.id));
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
                        title="Add Grade" 
                        onClick={() => go(routes.courses.add)} 
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
            field: 'title',
            headerName: "Course Title",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'code',
            headerName: "Short Code",
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
                title="Courses"
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

export default CoursesPage;