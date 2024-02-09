import useFormManager from "core/hooks/use-form";
import useApplicationService from "../application-service"
import Application, { ApplicationSchema } from "../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import Course from "pages/course/schema";
import useCourseService from "pages/course/course-service";
import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const CreateApplicationPage = () => {
    const { getCourses } = useCourseService();
    const { apply, loading } = useApplicationService();
    const { formState, handleChange, handleElementChange, reset } = useFormManager<Application>({initialState: {} as Application});
    const { register, handleSubmit, formState: { errors }} = useForm<Application>({resolver: yupResolver(ApplicationSchema)});
    const [courses, setCourses] = useState<Course[]>([]);

    const handleformSubmit = async (data: Application) => {
        const response = await apply(data);
        if(response.header.responseCode === "0"){
            reset();
        }
    }

    const loadData = async () => {
        const response = await getCourses();
        if(response.header.responseCode === "0"){
            setCourses(response.body.data);
        }
    }

    useEffect(() => {
        loadData();

    }, []);

    return (
        <Box>
            <CCard 
                title="Student Application"
                children={
                    <form onSubmit={handleSubmit(handleformSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="First Name"
                                        placeholder="First Name"
                                        {...register("firstName")}
                                        value={formState?.firstName ?? ""}
                                        error={errors.firstName ? true : false}
                                        helperText={errors.firstName?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Middle Name"
                                        placeholder="Middle Name"
                                        {...register("middleName")}
                                        value={formState?.middleName ?? ""}
                                        error={errors.middleName ? true : false}
                                        helperText={errors.middleName?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Last Name"
                                        placeholder="Last Name"
                                        {...register("lastName")}
                                        value={formState?.lastName ?? ""}
                                        error={errors.lastName ? true : false}
                                        helperText={errors.lastName?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            label="Gender"
                                            {...register("gender")}
                                            value={formState?.gender ?? "MALE"}
                                            error={errors.gender ? true : false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            <MenuItem value="MALE">Male</MenuItem>
                                            <MenuItem value="FEMALE">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField 
                                        label="Phone Number"
                                        placeholder="255123456789"
                                        {...register("phoneNumber")}
                                        value={formState?.phoneNumber ?? ""}
                                        error={errors.phoneNumber ? true : false}
                                        helperText={errors.phoneNumber?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Email"
                                        placeholder="example@gmail.com"
                                        {...register("email")}
                                        value={formState?.email ?? ""}
                                        error={errors.email ? true : false}
                                        helperText={errors.email?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Address"
                                        placeholder="Address"
                                        {...register("address")}
                                        value={formState?.address ?? ""}
                                        error={errors.address ? true : false}
                                        helperText={errors.address?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Guardian Full Name"
                                        placeholder="Guardian Full Name"
                                        {...register("guardianName")}
                                        value={formState?.guardianName ?? ""}
                                        error={errors.guardianName ? true : false}
                                        helperText={errors.guardianName?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Guardian Contacts"
                                        placeholder="25512345678"
                                        {...register("guardianPhoneNumber")}
                                        value={formState?.guardianPhoneNumber ?? ""}
                                        error={errors.guardianPhoneNumber ? true : false}
                                        helperText={errors.guardianPhoneNumber?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Guardian Email"
                                        placeholder="example@dit.ac.tz"
                                        {...register("guardianEmail")}
                                        value={formState?.guardianEmail ?? ""}
                                        error={errors.guardianEmail ? true : false}
                                        helperText={errors.guardianEmail?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="CSEE Index Number"
                                        fullWidth
                                        placeholder="S0001/0001/1970"
                                        {...register("formFourIndexNumber")}
                                        value={formState?.formFourIndexNumber ?? ""}
                                        error={errors.formFourIndexNumber ? true : false}
                                        helperText={errors.formFourIndexNumber?.message as string}
                                        onChange={handleChange}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Course</InputLabel>
                                        <Select
                                            label="Course"
                                            {...register("courseId")}
                                            value={formState?.courseId ?? courses[0]?.id ?? 0}
                                            error={errors.courseId ? true : false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            {courses.length > 0 ? courses.map(course => 
                                                <MenuItem value={course.id} key={course.id}>{course.title}</MenuItem>) : 
                                                <MenuItem value={0}>Choose Course</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            label="Category"
                                            {...register("category")}
                                            value={formState?.category ?? "DIPLOMA"}
                                            error={errors.category ? true : false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            <MenuItem value="DIPLOMA">Ordinary Diploma</MenuItem>
                                            <MenuItem value="DEGREE">Bachelor Degree</MenuItem>
                                            <MenuItem value="MASTERS">Master Degree</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField 
                                        label="Application Year"
                                        fullWidth
                                        placeholder="2023"
                                        {...register("year")}
                                        value={formState?.year ?? ""}
                                        error={errors.year ? true : false}
                                        helperText={errors.year?.message as string}
                                        onChange={handleChange}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
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

export default CreateApplicationPage;