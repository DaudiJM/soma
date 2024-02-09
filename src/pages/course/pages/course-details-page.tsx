import { useParams } from "react-router-dom";
import useCourseService from "../course-service";
import { useDetails } from "core/hooks/use-page-state";
import Course from "../schema";
import { Action, DETAILS_PAGE_ACTION, EntityStatus, Role } from "utils/enums";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import Details from "core/components/Details";
import Wrapper from "core/components/Wrapper";
import { Utils, getDetailsRoute, shouldAllow } from "utils/Utils";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth, useRouter } from "core/hooks/custom-hooks";
import useToggle from "core/hooks/use-toggle";
import CustomDialog from "core/components/Dialogs";
import ScoreConfigForm from "./score-config-form";
import routes from "utils/routes";

const CourseDetailsPage = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { loading, getCourse } = useCourseService();
    const [state, dispatch] = useDetails<Course>();
    const [showScoreConfig, toggleScoreConfig] = useToggle();
    const { go } = useRouter();

    const loadData = async () => {
        const response = await getCourse(id ?? 0);
        if(response.header.responseCode === "0"){
            dispatch({action: DETAILS_PAGE_ACTION.SET_DATA, payload: response.body.data});
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
            {shouldAllow(state?.data?.status, [EntityStatus.ACTIVE]) 
                && shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) && <Button 
                color="success"
                endIcon={<CheckIcon />}
                onClick={handleActions(Action.Activate)}
            >
                Activate
            </Button>}
            {shouldAllow(state?.data?.status, [EntityStatus.DELETED]) 
                && shouldAllow(user?.roles[0], [Role.ADMINISTRATOR]) &&<Button 
                color="error"
                endIcon={<DeleteIcon />}
                onClick={handleActions(Action.Delete)}
            >
                Delete
            </Button>
            }
            <Button onClick={toggleScoreConfig}>
                Configure Score
            </Button>
            <Button onClick={() => go(getDetailsRoute(routes.courses.modules, id ?? 0))}>
                Modules
            </Button>
        </Wrapper>
    );
    
    useEffect(() => {
        loadData();
    }, []);

    return(
        <Box>
            <CCard 
                title="Details Page"
                actions={actions}
                children={
                    <Box>
                        <Details 
                            data={state.data}
                        />
                    </Box>
                }
            />
            <CustomDialog 
                title="Configure Scores"
                onClose={toggleScoreConfig}
                open={showScoreConfig}
                children={<ScoreConfigForm data={state.data} onSuccess={toggleScoreConfig}/>}
            />
        </Box>
    );
}

export default CourseDetailsPage;