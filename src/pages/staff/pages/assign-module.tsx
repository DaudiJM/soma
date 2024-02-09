import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import Staff, { StaffModule } from "../schema";
import Wrapper from "core/components/Wrapper";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { TSelected } from "utils/schema";
import useModuleService from "pages/modules/module-service";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import DataTable from "core/components/data-table";
import { GridColDef } from "@mui/x-data-grid";
import { CourseCarriculum } from "pages/course/schema";
import Module from "pages/modules/schema";

const ModuleAssignmentPage = ({data: staff}: {data: Staff}) => {
    const [modules, setModules] = useState<Module[]>([]);
    const [selected, setSelected] = useState<TSelected>([]);
    const { loading, assignLecturer, getDepartmentModules } = useModuleService();

    const loadData = async () => {
        const response = await getDepartmentModules(staff?.departmentId);
        if(response.header.responseCode === "0"){
            setModules(response.body.data);
        }
    }
    
    const handleChange = (modules: TSelected) => {
        setSelected(modules);
    }

    const handleAssignment = async () => {
        const data: StaffModule = {staffId: staff?.id, modulesIds: selected} as StaffModule;
        const response = await assignLecturer(data);
        if(response.header.responseCode === "0"){
            setSelected(response.body.data.modulesIds);
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Module Title',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
            field: 'code',
            headerName: 'Module Code',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
            field: 'awardLevel',
            headerName: 'NTA Level',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
    ];

    useEffect(() => {
        loadData();
    }, []);

    return(
        <Box>
            <CCard 
                title="Assign Modules"
                actions={
                    <Wrapper>
                        {selected.length > 0 && <LoadingButton onClick={handleAssignment} loading={loading}>
                            Assign
                        </LoadingButton>}
                    </Wrapper>
                }
                children={
                    <Box>
                        <DataTable 
                            columns={columns}
                            rows={modules}
                            enableSelection
                            onPagechange={() => {}}
                            onSelectionChange={handleChange}
                            records={modules.length}
                            model={{page: 0, pageSize: modules.length}}
                        />
                    </Box>
                }
            />
        </Box>
    )
}

export default ModuleAssignmentPage;