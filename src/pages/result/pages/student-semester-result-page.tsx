import Box from "@mui/material/Box"
import CCard from "core/components/Cards"
import StudentResults from "./student-result";


const StudentSemesterResultPage = () => {
    const registrationNumber:string = "200201010004";

    return(
        <Box>
            <CCard 
                title="Student Result"
                hideBackButton
                children={
                    <Box>
                        <StudentResults registrationNumber={registrationNumber}/>
                    </Box>
                }
            />
        </Box>
    );
}

export default StudentSemesterResultPage;