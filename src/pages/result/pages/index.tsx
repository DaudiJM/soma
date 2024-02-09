import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import { Role } from "utils/enums";
import LecturerResultsPage from "./lecturer-result-page";
import StudentSemesterResultPage from "./student-semester-result-page";

const ResultPage = () => {
    const role = Role.STUDENT;
    const id = 1;
    const registration = "200201010004";

    return(
        <Box>
            <CCard 
                title="Results"
                hideBackButton
                children={<Box />}
            />
            <Box sx={{mt:2}}/>
            {getSpecificPage(role, id)}
        </Box>
    );
}

export default ResultPage;

const getSpecificPage = (role: string, id: number) => {

    if(role === Role.LECTURER){
        return <LecturerResultsPage id={id}/>
    }

    if(role === Role.STUDENT){
        return <StudentSemesterResultPage />
    }

    return <Box />
};