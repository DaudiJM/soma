import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import useResultService from "../result-service";
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import useStudentService from "pages/student/student-service";
import Student from "pages/student/schema";
import { ClassModuleResult, StudentModuleResult } from "../schema";
import DataTable from "core/components/data-table";
import { GridColDef } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const UploadResultPage = () => {
    const { uploadResults, loading, getClassModuleResult } = useResultService();
    const { classId = 0, moduleId = 0, category = "ca" } = useParams();
    const { getClassStudents } = useStudentService();
    const [classResults, setClassResults] = useState<ClassModuleResult>({} as ClassModuleResult);
    const [results, setModuleResults] = useState<StudentModuleResult[]>([]);

    const loadData = async () => {
        await loadClassModuleResults();
        loadStudents();
    }

    const loadClassModuleResults = async () => {
        const response = await getClassModuleResult(parseInt(classId as string), parseInt(moduleId as string));
        if(response.header.responseCode === "0"){
            setClassResults(response?.body?.data);
        }
    }


    const loadStudents = async () => {
        const response = await getClassStudents(classId ?? 0);
        if(response.header.responseCode === "0"){
            initializeStudentResults(response.body.data);
        }
    }

    const initializeStudentResults = (data: Student[]) => {
        const studentResults:StudentModuleResult[] = data.map((student, index) => {
            let ca:number = 0;
            let fe:number = 0;

            if(classResults?.results?.length > 0){
                results.forEach((result, index) => {
                    if(result?.registrationNumber === student?.registrationNumber){
                        ca = result?.ca ?? 0;
                        fe = result?.fe ?? 0;
                    }
                })
            }
            const result:StudentModuleResult = {id: index, ca: ca, fe: fe, moduleCode: classResults?.moduleCode, registrationNumber: student?.registrationNumber, name: `${student?.firstName} ${student?.middleName[0].toUpperCase()} ${student?.lastName}`} as StudentModuleResult;
            return result;
        });
       setModuleResults(studentResults);
    }

    const storeStudentScores = (index: number, score: number) => {
       
        const updated :StudentModuleResult[] = results.map((res, idx) => {
            if(idx === index){
                if(category === "ca"){
                    return {...res, ca: score}
                } else {
                    return {...res, fe: score}
                }
            }
            return res;
        });
        console.log(updated);
        setModuleResults(updated);
    }

    const handleSubmit = async () => {
        const data: ClassModuleResult = {
            moduleCode: classResults?.moduleCode,
            programmeId: classId as number,
            results: results,
            id: classId as number,
        };

        const response = await uploadResults(data, category as "ca" | "fe");
        if(response.header.responseCode === "0"){

        }
    }

    const columns: GridColDef[] = [
        {
            field: 'index',
            headerName: 'S/N',
            maxWidth: 80,
            minWidth: 50,
            flex: 1,
            renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1
        },
        {
          field: 'name',
          headerName: 'Name',
          minWidth: 150,
          flex: 1,
          editable: false,
        },
        {
            field: 'registrationNumber',
            headerName: 'Registration Number',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
            field: category,
            headerName: 'Score',
            minWidth: 150,
            flex: 1,
            editable: false,
            renderCell: (params) => {
                let scoreIndex = 0;
                results.forEach((result, index) => {
                    if(result?.registrationNumber === params.row.registrationNumber){
                        scoreIndex = index
                    }
                })
                return(
                    <TextField 
                        fullWidth
                        value={category === "ca" ? results[scoreIndex]?.ca : results[scoreIndex]?.fe}
                        name={category === "ca" ? "ca" : "fe"}
                        type="number"
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            storeStudentScores(scoreIndex, parseFloat(e.target.value != undefined ? e.target.value : "0"));
                        }}
                        sx={{ height:50}}
                    />
                )
            }
        },    
    ];
    
    useEffect(() => {
        loadData();
    }, []);

    return(
        <Box>
            <CCard 
                title={`Upload ${category.toUpperCase()} score for ${classResults?.moduleCode} ${classResults?.programme}`}
                children={
                    <Box>
                        <DataTable 
                            rows={results}
                            columns={columns}
                            onPagechange={() => {}}
                            onSelectionChange={() => {}}
                            records={results.length}
                            model={{page: 0, pageSize: results.length}}
                        />
                        <LoadingButton
                            sx={{mt:4}}
                            variant="contained"
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Upload
                        </LoadingButton>
                    </Box>
                }
            />
        </Box>
    )
}

export default UploadResultPage;