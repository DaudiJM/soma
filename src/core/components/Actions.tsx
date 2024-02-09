import Stack from "@mui/material/Stack";
import { Action, EntityStatus, Role } from "../../utils/enums";
import { useAuth } from "../hooks/custom-hooks";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from "@mui/material/Box";
import { GridCellParams } from "@mui/x-data-grid";
import { ReactNode } from "react";

type Props = {
    entity: string;
    roles: Role[];
    params: GridCellParams<any, any, any>;
    actionHandler: (action:Action, params: GridCellParams<any, any, any>) => void;
    actions?: ReactNode[] | null
}

const Actions:React.FC<Props> = ({ actionHandler, entity, params, roles, actions }) => {
    const { user } = useAuth();
    const handleAction = (action: Action) => {
        actionHandler(action, params);
    }

    return(
        <Stack direction="row"> 
            <Tooltip title={`View ${entity} Details`}>
                <IconButton onClick={() => handleAction(Action.Read)}>
                    <VisibilityOutlinedIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            {roles.includes(user?.roles[0] as Role) && <Box>
                <Tooltip title={`Edit ${entity} Details`}>
                    <IconButton onClick={() => handleAction(Action.Update)}>
                        <EditOutlinedIcon color="success" fontSize="small"/>
                    </IconButton>
                </Tooltip>
                {params.row.status !== EntityStatus.DELETED && <Tooltip title={`Delete ${entity}`}>
                    <IconButton onClick={() => handleAction(Action.Delete)}>
                        <DeleteOutlineOutlinedIcon color="error" fontSize="small"/>
                    </IconButton>
                </Tooltip>}
            </Box>}
            {actions}
        </Stack>
    );
}

export default Actions;