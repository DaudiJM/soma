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
import useStaffService from "../staff-service";
import Staff from "../schema";
import CreateStaffPage from "./create";
import StaffRolePage from "./staff-role";
import ModuleAssignmentPage from "./assign-module";

const StaffDetails = () => {
    const {  loading, getStaff } = useStaffService();
    const { id } = useParams();
    const [open, toggle] = useToggle();
    const [assign, toggleAssignment] = useToggle();
    const [assignModules, toggleModuleAssignment] = useToggle();
    const { user } = useAuth();
    const[state, dispatch] = useDetails<Staff>();

    const loadPage = async () => {
        const response = await getStaff(id ?? 0)
        if(response.header.responseCode === "0"){
            dispatch({action: DETAILS_PAGE_ACTION.SET_DATA, payload: response.body.data});
        }
    
    }

    const handleReload = () => {
        loadPage();
        dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_UPDATE});
    }
    

    const handleActions = (action: Action) => () => {
        const title = `Are you sure you want to ${action.toLowerCase()} this staff?`;
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
            {shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) && <Button 
                color="inherit"
                endIcon={<EditIcon />}
                onClick={handleActions(Action.Update)}
            >
                Update
            </Button>}
            {/* {!shouldAllow(state?.data?.status, [EntityStatus.ACTIVE]) 
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
            } */}
            {shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) &&<Button
                onClick={toggleAssignment}
            >
                {assign ? "Close" : "Assign Roles"}
            </Button>
            }
            {shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) &&<Button
                onClick={toggleModuleAssignment}
            >
                {assign ? "Close" : "Assign Modules"}
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
            }
        </Wrapper>
    );


    useEffect(() => {
        loadPage();

        return () => {}
    }, []);

    
    return(
        <Box>
            {assign ? <StaffRolePage data={state?.data}/> : 
            assignModules ? <ModuleAssignmentPage data={state?.data}/> : 
            <CCard 
                title="Staff Details"
                actions={actions}
            >
                {loading ? <Loader /> :
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

export default StaffDetails;