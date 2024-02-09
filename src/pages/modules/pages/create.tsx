import Award from "pages/awards/schema"
import Department from "pages/department/schema";
import { useEffect, useState } from "react"
import useModuleService from "../module-service";
import useDepartmentService from "pages/department/department-service";
import useAwardService from "pages/awards/award-service";
import Module, { ModuleSchema } from "../schema";
import useFormManager from "core/hooks/use-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CreateModulePage = () => {
    const [awards, setAwards] = useState<Award[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const { createModule, loading } = useModuleService();
    const { getDepartments } = useDepartmentService();
    const { getAwards } = useAwardService();

    const { formState, handleChange, handleElementChange, reset } = useFormManager<Module>({initialState: {} as Module});
    const { register, handleSubmit, formState: { errors }} = useForm<Module>({resolver: yupResolver(ModuleSchema)});
    
    const loadData = async () => {
        const response = await getDepartments();
        if(response.header.responseCode == "0"){
            setDepartments(response.body.data);
            handleElementChange("departmentId", response.body.data[0]?.id)
        }

        const awardsResponse = await getAwards();
        if(awardsResponse.header.responseCode == "0"){
            setAwards(awardsResponse.body.data);
            handleElementChange("awardLevel", awardsResponse.body.data[0]?.level)
        }
    }

    const handleformSubmit = async (data: Module) => {
        const response = await createModule(data);
        if(response.header.responseCode === "0"){
            reset();
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return(
        <Box>
            <CCard 
                title="Add Module"
                children={
                    <form onSubmit={handleSubmit(handleformSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Module Title"
                                        placeholder="Module Title"
                                        {...register("title")}
                                        value={formState?.title ?? ""}
                                        error={errors.title ? true : false}
                                        helperText={errors.title?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Credits"
                                        placeholder="Credits"
                                        {...register("credits")}
                                        value={formState?.credits ?? ""}
                                        error={errors.credits ? true : false}
                                        helperText={errors.credits?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>NTA Level</InputLabel>
                                        <Select
                                            label="NTA Level"
                                            {...register("awardLevel")}
                                            value={formState?.awardLevel ?? awards[0]?.level ?? 0}
                                            error={errors.awardLevel ? true : false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            {awards.length > 0 ? awards.map(award => 
                                                <MenuItem value={award.level} key={award.id}>NTA Level {award.level}</MenuItem>) : 
                                                <MenuItem value={0}>Choose NTA Level</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Module Code"
                                        placeholder="COU 07101"
                                        {...register("code")}
                                        value={formState?.code ?? ""}
                                        error={errors.code ? true : false}
                                        helperText={errors.code?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Departments</InputLabel>
                                        <Select
                                            label="Departments"
                                            {...register("departmentId")}
                                            value={formState?.departmentId ?? departments[0]?.id ?? 0}
                                            error={errors.departmentId ? true : false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            {departments.length > 0 ?departments.map(department => 
                                                <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>) :
                                                <MenuItem value={0}>Choose Department</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField 
                                        label="Semester"
                                        placeholder="Semester"
                                        {...register("semester")}
                                        value={formState?.semester ?? 0}
                                        error={errors.semester ? true : false}
                                        helperText={errors.semester?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    variant="contained"
                                    type="submit"
                                    loading={loading}
                                >
                                    Submit
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                }
            />
        </Box>
    );
}

export default CreateModulePage;