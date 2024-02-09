import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useResultService from "../result-service";
import { StudentSemesterResult } from "../schema";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StudentSemesterResultsTable from "./student-semester-result";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StudentResults = ({ registrationNumber }: {registrationNumber: string}) => {
    const [tabIndex, setTabIndex] = useState(0);
    const { getStudentYearResult, loading } = useResultService();
    const [results, setResults] = useState<StudentSemesterResult[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        loadData(newValue + 1);
    };

    const loadData = async (year: number = 1) => {
        const response = await getStudentYearResult(registrationNumber, year);
        if(response.header.responseCode == "0"){
            setResults(response.body.data);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return(
        <Box>
            <Grid container spacing={3} sx={{mb:4}}>
                <Grid item xs={6}>
                    <Stack spacing={3}>
                        <Typography variant="body1">Student Name</Typography>
                        <Typography variant="body1">Registration Number</Typography>
                        {/* <Typography variant="body1">GPA</Typography> */}
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={3}>
                        <Typography variant="h6">{ `${results[0]?.student?.firstName} ${results[0]?.student?.middleName} ${results[0]?.student?.lastName}` }</Typography>
                        <Typography variant="h6">{ results[0]?.student?.registrationNumber }</Typography>
                        {/* <Typography variant="h6">{ results[0]?.semesterGpa ?? 0 }</Typography> */}
                    </Stack>
                </Grid>
            </Grid>
            <Box mb={4}>
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab label="1st Year" {...a11yProps(0)}/>
                    <Tab label="2nd year" {...a11yProps(1)}/>
                    <Tab label="3rd Year" {...a11yProps(2)}/>
                </Tabs>
            </Box>
            { results.map((result, index) => {
                return result?.results.length > 0 ? <StudentSemesterResultsTable results={result} key={index}/> : null
            })}

        </Box>
    )
}

export default StudentResults;