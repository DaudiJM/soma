import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Action, DETAILS_PAGE_ACTION, EntityStatus, Role } from "utils/enums";
import { useEffect } from "react";
import CCard from "core/components/Cards";
import ConfirmDialog from "core/components/ConfirmDialog";
import CreateUser from "./create-update";
import useToggle from "core/hooks/use-toggle";
import { useAuth } from "core/hooks/custom-hooks";
import Wrapper from "core/components/Wrapper";
import Loader from "core/components/Loader";
import useUserService from "../user-service";
import Details from "core/components/Details";
import User from "../schema";
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

const UserDetails = () => {
    const { changeUserStatus, loading, getUser, resetUser } = useUserService();
    const { id } = useParams();
    const [open, toggle] = useToggle();
    const { user } = useAuth();
    const[state, dispatch] = useDetails<User>();

    const loadPage = async () => {
        const response = await getUser(id ?? 0)
        if(response.header.responseCode === "0"){
            dispatch({action: DETAILS_PAGE_ACTION.SET_DATA, payload: response.body.data});
        }
    
    }

    const handleReload = () => {
        loadPage();
        dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_UPDATE});
    }


    const handleUserReset = async () => {
        
        const response = await resetUser({msisdn: state.data?.msisdn});
        if(response.header.responseCode === "0"){
            loadPage();
        }
    }


    const handleChangeStatus = async () => {
        const response = await changeUserStatus({ id: state.data?.id, status: state.status });

        if(response.header.responseCode === "0"){
            dispatch({action: DETAILS_PAGE_ACTION.SET_DATA, payload: response.body.data});
                dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_CONFIRMATION});
        }
    }
    

    const handleActions = (action: Action) => () => {
        const title = `Are you sure you want to ${action.toLowerCase()} this user?`;
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
            }
        </Wrapper>
    );

    const createActions = (
        <>
            <ActionButton 
                icon={CloseIcon}
                title="Close"
                onClick={() => dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_UPDATE})} 
            />
        </>
    )

    useEffect(() => {
        loadPage();

        return () => {}
    }, []);

    
    return(
        <Box>
            {state.update ? 
                <CCard 
                    title="Update User"
                    actions={createActions}
                    hideBackButton
                    children={
                        <CreateUser 
                            data={state.data} 
                            reload={handleReload}
                        />
                    }
                />
            :
            <CCard 
                title="User Details"
                actions={actions}
            >
                {loading ? <Loader /> :
                    <Details 
                        data={state.data}
                    />
                }
            </CCard>}
            <ConfirmDialog 
                open={state.confirmation} 
                onClose={() => dispatch({action: DETAILS_PAGE_ACTION.TOGGLE_CONFIRMATION})} 
                title={state.title} 
                onConfirm={handleChangeStatus} 
                loading={loading}
            />
            <ConfirmDialog 
                open={open} 
                onClose={toggle} 
                onConfirm={handleUserReset} 
                title={state.title} 
                loading={loading}
            />
        </Box>
    );
}

export default UserDetails;