import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import { useParams } from "react-router-dom";
import useDepartmentService from "../department-service";

const ModuleAssignmentPage = () => {
    const { id } = useParams();
    const { } = useDepartmentService();

    return(
        <Box>
            <CCard 
                title="Module Assignment"
                children={
                    <Box></Box>
                }
            />
        </Box>
    )
}

export default ModuleAssignmentPage;