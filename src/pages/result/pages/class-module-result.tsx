import Box from "@mui/material/Box";
import useResultService from "../result-service";
import CCard from "core/components/Cards";
import { useEffect, useState } from "react";
import { ClassModuleResult, StudentModuleResult } from "../schema";
import DataTable from "core/components/data-table";
import { GridColDef } from "@mui/x-data-grid";
import Status from "core/components/Status";
import Wrapper from "core/components/Wrapper";
import Button from "@mui/material/Button";
import { useRouter } from "core/hooks/custom-hooks";
import routes from "utils/routes";

const ClassModuleResultPage = ({ moduleId, classId, onClose }: {moduleId: number, classId: number, onClose?: () => void}) => {
    const { loading, getClassModuleResult } = useResultService();
    const [results, setResults] = useState<ClassModuleResult>({} as ClassModuleResult);
    const { go } = useRouter();

    const loadData = async () => {
        const response = await getClassModuleResult(moduleId, classId);
        if(response.header.responseCode === "0"){
            setResults(response.body.data);
        }
    }

    const handleUpload = (category: "ca" | "fe") => () => {
        go(routes.results.upload
            .replace(":classId", classId?.toString())
            .replace(":moduleId", moduleId?.toString())
            .replace(":category", category)
        )
    }

    useEffect(() => {
        loadData();
    }, []);

    const actions = (
        <Wrapper>
            <Button onClick={handleUpload("ca")}>Upload CA</Button>
            <Button onClick={handleUpload("fe")}>Upload FE</Button>
            <Button onClick={onClose}>Close</Button>
        </Wrapper>
    );

    const columns:GridColDef[] = [
        {
            field: 'sn',
            headerName: "SN",
            editable: false,
            width: 70,
            renderCell: (index) => (index.api.getRowIndexRelativeToVisibleRows(index.id) + 1)
        },
        {
            field: 'name',
            headerName: "Name",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'registrationNumber',
            headerName: "Reg No",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'ca',
            headerName: "CW",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'fe',
            headerName: "FE",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'grade',
            headerName: "Grade",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            editable: false,
            flex: 1,
            renderCell: (params) => <Status status={params.row.status}/>
        },
    ];

    return(
        <Box>
            <CCard 
                title={`${results?.moduleTitle} Results : ${results?.programme}`}
                hideBackButton
                actions={actions}
                children={
                    <Box>
                        <DataTable 
                            columns={columns}
                            rows={results?.results}
                            model={{page: 0, pageSize: results?.results?.length}}
                            onPagechange={() => {}}
                            records={results?.results?.length}
                        />
                    </Box>
                }
            />
        </Box>
    )
}

export default ClassModuleResultPage;