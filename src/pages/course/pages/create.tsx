import useFormManager from "core/hooks/use-form";
import useCourseService from "../course-service"
import Course, { CourseSchema } from "../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useDepartmentService from "pages/department/department-service";
import { useEffect, useState } from "react";
import Department from "pages/department/schema";
import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CreateCoursePage = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const { getDepartments } = useDepartmentService();
    const { createCourse, loading } = useCourseService(); 
    const { formState, handleChange, handleElementChange, reset } = useFormManager<Course>({initialState: {} as Course});
    const { register, handleSubmit, formState: { errors }} = useForm<Course>({resolver: yupResolver(CourseSchema)});

    const handleformSubmit = async (data: Course) => {
        const response = await createCourse(data);
        if(response.header.responseCode === "0"){
            reset();
        }
    }

    const loadData = async () => {
        const response = await getDepartments();
        if(response.header.responseCode === "0"){
            setDepartments(response.body.data);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Box>
            <CCard 
                title="Add Course"
                children={
                    <form onSubmit={handleSubmit(handleformSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Course Title"
                                        placeholder="Course Title"
                                        {...register("title")}
                                        value={formState?.title ?? ""}
                                        onChange={handleChange}
                                        error={errors.title ? true : false}
                                        helperText={errors.title?.message as string}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Course Code"
                                        placeholder="Course Short Code"
                                        {...register("code")}
                                        value={formState?.code ?? ""}
                                        onChange={handleChange}
                                        error={errors.code ? true : false}
                                        helperText={errors.code?.message as string}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Department</InputLabel>
                                        <Select
                                            label="Department"
                                            {...register("departmentId")}
                                            value={formState?.departmentId ?? departments[0]?.id ?? 0}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                            error={errors?.departmentId ? true : false}
                                        >
                                            {departments.length > 0 ? departments.map(department => <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>) : <MenuItem value={0}>Choose Department</MenuItem>}
                                        </Select>
                                    </FormControl>
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

export default CreateCoursePage;