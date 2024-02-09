import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useFormManager from "core/hooks/use-form";
import Student, { StudentSchema } from "pages/student/schema";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import routes from "utils/routes";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(StudentSchema)});
    const {formState, handleChange, handleElementChange, reset} = useFormManager<Student>({initialState: {} as Student});

    return(
        <Box>
            <Typography 
                align="center" 
                variant="subtitle2" sx={{py:1, mb:2}}
            >Registration</Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack spacing={3}>
                                <TextField 
                                    label="First Name"
                                    fullWidth
                                    placeholder="First Name"
                                    {...register("firstName")}
                                    value={formState.firstName}
                                    onChange={handleChange}
                                    error={errors?.firstName ? true : false}
                                    helperText={errors.firstName?.message as string}
                                />
                                <TextField 
                                    label="Last Name"
                                    fullWidth
                                    placeholder="Last Name"
            
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        label="Gender"
                                    >
                                        <MenuItem value="M">Male</MenuItem>
                                        <MenuItem value="F">Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField 
                                    label="Phone Number"
                                    fullWidth
                                    placeholder="255123456789"
                                />
                                <TextField 
                                    label="Email"
                                    fullWidth
                                    placeholder="example@gmail.com"
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={3}>
                                <TextField 
                                    label="CSEE Index Number"
                                    fullWidth
                                    placeholder="S0001/0001/1970"
                                />
                                <TextField 
                                    label="Password"
                                    fullWidth
                                    placeholder="Password"
                                />
                                <TextField 
                                    label="Confirm Password"
                                    fullWidth
                                    placeholder="Confirm Password"
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton variant="contained" fullWidth>Submit</LoadingButton>
                            <Button fullWidth onClick={() => navigate(routes.index)}>Already have an Account? Login</Button>
                        </Grid>
                    </Grid>
                </form>
            <Typography align="center" variant="body2" sx={{py:1}}>Copyright {new Date().getFullYear()}. All rights reseved.</Typography>
        </Box>
    );
}

export default RegisterPage;