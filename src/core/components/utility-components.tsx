import IconButton from "@mui/material/IconButton";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import SvgIcon, { SvgIconTypeMap } from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";

type ActionButtonProps = {
    title: string,
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string },
    onClick: () => void;
}

export const ActionButton = (props: ActionButtonProps) => {
    const { title, icon, onClick} = props;

    return(
        <Tooltip title={title}>
            <IconButton onClick={onClick}>
                <SvgIcon component={icon} />
            </IconButton>
        </Tooltip>
    );
}