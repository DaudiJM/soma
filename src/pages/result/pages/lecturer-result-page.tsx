import { useParams } from "react-router-dom";
import useResultService from "../result-service";
import { useEffect, useState } from "react";
import Class from "pages/class/schema";
import Box from "@mui/material/Box";
import HelpCard from "core/components/HelpCard";
import HomeIcon from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import useModuleService from "pages/modules/module-service";
import ClassModuleResultPage from "./class-module-result";
import Typography from "@mui/material/Typography";

const LecturerResultsPage = ({id}: {id: number }) => {
    const { loading, getLecturerClasses } = useResultService();
    const { getLecturerClassModule } = useModuleService();
    const [classes, setClasses] = useState<Class[]>([]);
    const [selected, setSelected] = useState<{classId: number, moduleId: number} | null>(null);

    const loadData = async () => {
        const lecturerId:number = (id != null || id != undefined) ? id : 0;
        const result = await getLecturerClasses(lecturerId);

        if(result.header.responseCode == "0"){
            setClasses(result.body.data.programmes as Class[]);
        }
    }

    const getModule = async (classId: number) => {
        const response = await getLecturerClassModule(classId, id);
        setSelected({classId: classId, moduleId: response.body.data?.id })
    }

    const close = () => setSelected(null);

    useEffect(() => {
        loadData();
    }, []);

    return(
        <Box>
            {selected == null ? <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" >Classes</Typography>
                </Grid>
                {classes.map(cls => <Grid item key={cls?.id}><HelpCard title={cls.name} path="" icon={<HomeIcon />} onClick={() => getModule(cls?.id)}/></Grid>)}
            </Grid> : <ClassModuleResultPage classId={selected?.classId} moduleId={selected?.moduleId} onClose={close}/>}
        </Box>
    );
}

export default LecturerResultsPage;