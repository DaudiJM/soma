import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "core/components/data-table";
import useCourseService from "pages/course/course-service";
import Course from "pages/course/schema";
import useModuleService from "pages/modules/module-service";
import Module from "pages/modules/schema";
import { useEffect, useState } from "react";
import { TSelected } from "utils/schema";
import useCurriculumService from "../curriculum-schema";
import CourseCurriculum, { Curriculum } from "../schema";

const CourseCurriculumConfigPage = ({id}: {id: number | string}) => {
    const [modules, setModules] = useState<Module[]>([]);
    const [course, setCourse] = useState<Course>({} as Course);
    const [selected, setSelected] = useState<TSelected>([]);
    const { getModules } = useModuleService();
    const { getCourse } = useCourseService();
    const { setCourseCurriculum, loading } = useCurriculumService();

    const loadData = async () => {
        const response = await getModules();
        if(response.header.responseCode === "0"){
            setModules(response.body.data);
        }

        const res = await getCourse(id ?? 0);
        if(res.header.responseCode === "0"){
            setCourse(res.body.data);
        }
    }

    const onSelectionChange = (selected: TSelected) => {
        setSelected(selected);
    }

    const handleModuleAssignment = async () => {
        const data:CourseCurriculum = {
            id: course?.id,
            course: course?.title,
            modules: selected.map(id => {
                const d:Curriculum = {courseId: course?.id, moduleId: parseInt(id as string), } as Curriculum;
                return d;
            })
        }

        const response = await setCourseCurriculum(data);
        if(response.header.responseCode == "0"){
            loadData();
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
            <Stack direction="column" sx={{px:0}}>
                <Typography variant="h6">Course: { course?.title }</Typography>
                <Typography variant="h6">Department: { course?.department }</Typography>
            </Stack>
            <Stack direction="row" sx={{px:0}}>
                <Box flexGrow={1}/>
                {selected!.length > 0 && <Button onClick={handleModuleAssignment}>
                    Assign
                </Button>}
            </Stack>
            <DataTable 
                columns={columns}
                rows={modules}
                model={{page: 0, pageSize: modules.length}}
                onPagechange={() => {}}
                enableSelection
                onSelectionChange={onSelectionChange}
                records={modules.length}
            />
        </Box>
    );
}

export default CourseCurriculumConfigPage;