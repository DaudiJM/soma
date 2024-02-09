import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Action, DETAILS_PAGE_ACTION, EntityStatus, Role } from "utils/enums";
import { useEffect } from "react";
import CCard from "core/components/Cards";
import ConfirmDialog from "core/components/ConfirmDialog";
import useToggle from "core/hooks/use-toggle";
import { useAuth } from "core/hooks/custom-hooks";
import Wrapper from "core/components/Wrapper";
import Loader from "core/components/Loader";
import Details from "core/components/Details";
import { shouldAllow } from "utils/Utils";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { ActionButton } from "core/components/utility-components";
import { useDetails } from "core/hooks/use-page-state";
import LockResetIcon from '@mui/icons-material/LockReset';
import CreateClassPage from "./create";
import useDepartmentService from "pages/department/department-service";
import Class from "../schema";
import useClassService from "../class-service";
import ClassStudentsPage from "./class-students";

const ClassDetailsPage = () => {
    const {  loading, getClass } = useClassService();
    const { id } = useParams();
    const [open, toggle] = useToggle();
    const [viewStudents, toggleStudents] = useToggle();
    const { user } = useAuth();
    const[state, dispatch] = useDetails<Class>();

    const loadPage = async () => {
        const response = await getClass(id ?? 0)
        if(response.header.responseCode === "0"){
            dispatch({action: DETAILS_PAGE_ACTION.SET_DATA, payload: response.body.data});
        }
    
    }

    const handleReload = () => {
        loadPage();
        dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_UPDATE});
    }


    // const handleUserReset = async () => {
        
    //     const response = await resetUser({msisdn: state.data?.msisdn});
    //     if(response.header.responseCode === "0"){
    //         loadPage();
    //     }
    // }


    // const handleChangeStatus = async () => {
    //     const response = await changeUserStatus({ id: state.data?.id, status: state.status });

    //     if(response.header.responseCode === "0"){
    //         dispatch({action: DETAILS_PAGE_ACTION.SET_DATA, payload: response.body.data});
    //             dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_CONFIRMATION});
    //     }
    // }
    

    const handleActions = (action: Action) => () => {
        const title = `Are you sure you want to ${action.toLowerCase()} this class?`;
        let status:EntityStatus = state?.status;

        switch(action){
            case Action.Update:
                status = EntityStatus.ALL;
                dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_UPDATE});
                break;
            case Action.Activate:
                status = EntityStatus.ACTIVE;
                break;
            case Action.Delete:
                status = EntityStatus.DELETED;
                break;
            case Action.Disable:
                status = EntityStatus.DISABLED;
                break;
            case Action.Reset:
                status = EntityStatus.ALL;
                dispatch({action: DETAILS_PAGE_ACTION.SET_TITLE, payload: title});
                toggle();
                break;
        }

        if(shouldAllow(status, [EntityStatus.ACTIVE, EntityStatus.DELETED, EntityStatus.DISABLED])){
            dispatch({action: DETAILS_PAGE_ACTION.SET_TITLE, payload: title});
            dispatch({action: DETAILS_PAGE_ACTION.SET_STATUS, payload: status});
            dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_CONFIRMATION});
        }
    }

    const actions = (
        <Wrapper>
            {/* {shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) && <Button 
                color="inherit"
                endIcon={<EditIcon />}
                onClick={handleActions(Action.Update)}
            >
                Update
            </Button>}
            {!shouldAllow(state?.data?.status, [EntityStatus.ACTIVE]) 
                && shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) && <Button 
                color="success"
                endIcon={<CheckIcon />}
                onClick={handleActions(Action.Activate)}
            >
                Activate
            </Button>}
            {!shouldAllow(state?.data?.status, [EntityStatus.DISABLED]) 
                && shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) && 
            <Button 
                color="warning"
                endIcon={<DoNotDisturbIcon />}
                onClick={handleActions(Action.Disable)}
            >
                Disable
            </Button>}
            {!shouldAllow(state?.data?.status, [EntityStatus.DELETED]) 
                && shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) &&<Button 
                color="error"
                endIcon={<DeleteIcon />}
                onClick={handleActions(Action.Delete)}
            >
                Delete
            </Button>
            }
            {shouldAllow(user?.roles[0], [Role.ADMINISTRATOR, ]) 
                && shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) &&<Button 
                color="primary"
                endIcon={<LockResetIcon />}
                onClick={handleActions(Action.Reset)}
            >
                Reset
            </Button>
            } */}
            <Button 
                color="primary"
                onClick={toggleStudents}
            >
                {viewStudents ? "Close" : "Students"}
            </Button>
        </Wrapper>
    );

    useEffect(() => {
        loadPage();

        return () => {}
    }, []);

    
    return(
        <Box>
            {<CCard 
                title="Class Details"
                actions={actions}
            >
                {loading ? <Loader /> : viewStudents ? <ClassStudentsPage id={state?.data?.id}/> : 
                    <Details 
                        data={state.data}
                    />
                }
            </CCard>}
            {/* <ConfirmDialog 
                open={state.confirmation} 
                onClose={() => dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_CONFIRMATION})} 
                title={state.title} 
                onConfirm={handleChangeStatus} 
                loading={loading}/
            >
            <ConfirmDialog 
                open={open} 
                onClose={toggle} 
                onConfirm={handleUserReset} 
                title={state.title} 
                loading={loading}
            /> */}
        </Box>
    );
}

export default ClassDetailsPage;