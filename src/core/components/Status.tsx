import { ChipColors } from "../../utils/app-interfaces";
import Chip from "@mui/material/Chip";

interface ComponentProp {
    status: string;
}

const Status:React.FC<ComponentProp>  = ({ status }) => {

    let color:ChipColors = "info";
    switch(status?.toUpperCase()) {
        case "ACTIVE":
            color = "success";
            break;
        case "IN ACTIVE":
        case "DELETED":
        case "EXPIRED":
            color = "error";
            break;
        case "PENDING":
        case "DISABLED":
            color = "warning";
            break;
        case "APPROVED":
            color = "primary";
            break;
        default:
            color = "info";
    }

    return(
        <Chip label={ status ?? "DEFAULT"} color={color} size="small" sx={{ fontSize: 13}}/>
    )
};


export default Status;