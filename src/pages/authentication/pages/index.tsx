import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Tooltip from "@mui/material/Tooltip";
import useToggle from "core/hooks/use-toggle";
import useFormManager from "core/hooks/use-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthManager from "core/hooks/use-auth-manager";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useAuthenticationService from "../authentication-service";
import { Utils } from "utils/Utils";
import MockData from "utils/mock";
import { AuthenticationSchema, TAuthentication } from "../schema";
import User from "../../user/schema";
import routes from "utils/routes";


const LoginPage = () => {
    const [showPassword, togglePasswordVisibility] = useToggle();
    const { authenticate } = useAuthManager();
    const navigate = useNavigate();
    const { authenticateUser, loading } = useAuthenticationService();
    const { formState, handleChange } = useFormManager({initialState: {username: "", password: ""}});
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(AuthenticationSchema)});

    const handleAuthentication = async () => {
        console.log(formState);
        const response = await authenticateUser<TAuthentication, User>({username: formState?.username, password: formState.password});
        if(response.header.responseCode === "0"){
            authenticate(response);
        }
    }
    
    return(
        <Box>
            <Typography align="center" variant="subtitle2" sx={{ mt:1, mb:5 }}>Sign In</Typography>
            <form onSubmit={handleSubmit(handleAuthentication)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            placeholder={MockData.username}
                            fullWidth
                            {...register("username")}
                            value={formState.username}
                            onChange={handleChange}
                            error={errors.username ? true : false}
                            helperText={errors.username?.message as string}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            placeholder={MockData.password}
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            value={formState.password}
                            onChange={handleChange}
                            error={errors.password ? true : false}
                            helperText={errors.password?.message as string}
                            InputProps={{
                                endAdornment: <Tooltip title={showPassword ? "Hide Password" : "Show Password"}>
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </IconButton>
                                </Tooltip>
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton variant="contained" fullWidth sx={{ mt:2 }} loading={loading} type="submit">Submit</LoadingButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={() => navigate("/forgot-password")}>Forgot Password? Reset</Button>
                    </Grid>
                </Grid>
            </form>
            <Button fullWidth onClick={() => navigate(routes.authentication.register)}>Do not have account? Register</Button>
        </Box>
    );
}


export default LoginPage;