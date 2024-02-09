import useFormManager from "core/hooks/use-form";
import useAwardService from "../award-service"
import Award, { AwardSchema } from "../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import CCard from "core/components/Cards";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const CreateAwardPage = () => {
    const { createAward, loading } = useAwardService();
    const { formState, handleChange, reset } = useFormManager<Award>({initialState: {} as Award});
    const { register, handleSubmit, formState: { errors }} = useForm<Award>({resolver: yupResolver(AwardSchema)});

    const handleformSubmit = async (data: Award) => {
        const response = await createAward(data);
        if(response.header.responseCode === "0"){
            reset();
        }
    }

    return (
        <Box>
            <CCard 
                title="Add Award"
                children={
                    <form onSubmit={handleSubmit(handleformSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Award Title"
                                        placeholder="Award Title"
                                        {...register("title")}
                                        value={formState?.title ?? ""}
                                        error={errors.title ? true : false}
                                        helperText={errors.title?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Award Level"
                                        placeholder="Award Level"
                                        {...register("level")}
                                        value={formState?.level ?? ""}
                                        error={errors.level ? true : false}
                                        helperText={errors.level?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
                                    <TextField 
                                        label="Semesters"
                                        placeholder="Semesters"
                                        {...register("semesters")}
                                        value={formState?.semesters ?? ""}
                                        error={errors.semesters ? true : false}
                                        helperText={errors.semesters?.message as string}
                                        onChange={handleChange}
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

export default CreateAwardPage;