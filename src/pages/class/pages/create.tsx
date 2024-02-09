import Course from "pages/course/schema"
import { useEffect, useState } from "react"
import useClassService from "../class-service";
import useCourseService from "pages/course/course-service";
import useFormManager from "core/hooks/use-form";
import Class, { ClassSchema } from "../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import Award from "pages/awards/schema";
import useAwardService from "pages/awards/award-service";

const CreateClassPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [ awards, setAwards] = useState<Award[]>([]);
    const { getAwards } = useAwardService();
    const { createClass, loading } = useClassService();
    const { getCourses } = useCourseService();
    const { formState, handleChange, handleElementChange, reset } = useFormManager<Class>({initialState: {} as Class});
    const { register, handleSubmit, formState: { errors }} = useForm<Class>({resolver: yupResolver(ClassSchema)});

    const handleformSubmit = async (data: Class) => {
        const response = await createClass(data);
        if(response.header.responseCode == "0"){
            reset();
        }
    };

    const loadData = async () => {
        const response = await getCourses();
        if(response.header.responseCode == "0"){
            setCourses(response.body.data);
        }

        const awardResponse = await getAwards();
        if(awardResponse.header.responseCode == "0"){
            setAwards(awardResponse.body.data);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Box>
            <CCard 
                title="Add Class"
                children={
                    <form onSubmit={handleSubmit(handleformSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Class Name"
                                        placeholder="Class Name"
                                        {...register("name")}
                                        value={formState?.name ?? ""}
                                        error={errors.name ? true: false}
                                        helperText={errors.name?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Staring Year"
                                        placeholder="Starting Year Eg. 2020"
                                        {...register("startingYear")}
                                        value={formState?.startingYear ?? ""}
                                        error={errors.startingYear ? true: false}
                                        helperText={errors.startingYear?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Year"
                                        placeholder="Year Eg. 1"
                                        {...register("year")}
                                        value={formState?.year ?? ""}
                                        error={errors.year ? true: false}
                                        helperText={errors.year?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Semester"
                                        placeholder="Current semester"
                                        {...register("semester")}
                                        value={formState?.semester ?? ""}
                                        error={errors?.semester ? true: false}
                                        helperText={errors.semester?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Course</InputLabel>
                                        <Select
                                            label="Course"
                                            {...register("courseId")}
                                            value={formState?.courseId ?? courses[0]?.id ?? 0}
                                            error={errors.courseId ? true: false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            {courses.length > 0 ? courses.map(course => 
                                                <MenuItem value={course.id} key={course.id}>{course.title}</MenuItem>) : 
                                                <MenuItem value={0}>Choose Course</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel>NTA Level</InputLabel>
                                        <Select
                                            label="NTA Level"
                                            {...register("awardLevel")}
                                            value={formState?.awardLevel ?? awards[0]?.level ?? 0}
                                            error={errors.awardLevel ? true: false}
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

export default CreateClassPage;