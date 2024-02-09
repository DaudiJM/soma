import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import useFormManager from "core/hooks/use-form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import MockData from "utils/mock"
import useUserService from "pages/user/user-service"
import { PasswordChangeSchema } from "pages/user/schema"


const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { resetUser, loading } = useUserService();
    const { formState, handleChange, reset } = useFormManager({initialState: { msisdn: ""}});
    const { register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(PasswordChangeSchema)});

    const handlePasswordReset = async () => {
        const response = await resetUser({ msisdn: formState.msisdn});
        
        if(response.header.responseCode === "0"){
            reset();
            navigate("/")
        }
    }

    const handleNavigation = (route: string) => () => {
        navigate(route);
    }
    
    return(
        <Box>
            <Typography align="center" variant="subtitle2" sx={{ mt:1, mb:5}}>Forgot Password</Typography>
            <form onSubmit={handleSubmit(handlePasswordReset)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            label="Phone Number"
                            placeholder={MockData.msisdn}
                            fullWidth
                            {...register("msisdn")}
                            value={formState?.msisdn ?? ""}
                            onChange={handleChange}
                            error={errors?.msisdn ? true : false}
                            helperText={errors.msisdn?.message as string}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton variant="contained" fullWidth type="submit" loading={loading}>Submit</LoadingButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={handleNavigation("/")}>Back to Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default ForgotPasswordPage;