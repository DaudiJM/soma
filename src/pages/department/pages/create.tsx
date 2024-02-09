import Box from "@mui/material/Box"
import useDepartmentService from "../department-service";
import useFormManager from "core/hooks/use-form";
import Department, { DepartmentSchema } from "../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import CCard from "core/components/Cards";

const CreateDepartment = () => {
    const { createDepartment, loading } = useDepartmentService();
    const { formState, handleChange, reset } = useFormManager<Department>({initialState: {} as Department});
    const { register, handleSubmit, formState: { errors }} = useForm<Department>({resolver: yupResolver(DepartmentSchema)});

    const handleformSubmit = async (data: Department) => {
        const response = await createDepartment(data);
        if(response.header.responseCode === "0"){
            reset();
        }
    }


    return(
        <Box>
            <CCard 
                title="Add Department"
                children={
                    <form onSubmit={handleSubmit(handleformSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Department Name"
                                        placeholder="Department Name"
                                        {...register("name")}
                                        value={formState?.name ?? ""}
                                        onChange={handleChange}
                                        error={errors.name ? true : false}
                                        helperText={errors.name?.message as string}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Department Code"
                                        placeholder="Department Short Code"
                                        {...register("code")}
                                        value={formState?.code ?? ""}
                                        onChange={handleChange}
                                        error={errors.code ? true : false}
                                        helperText={errors.code?.message as string}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton variant="contained" type="submit" loading={loading}>Submit</LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                }
            />
        </Box>
    );
}

export default CreateDepartment;