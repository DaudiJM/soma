import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { ChangePasswordInterface } from "utils/app-interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import useToggle from "core/hooks/use-toggle";
import useFormManager from "core/hooks/use-form";
import { useAuth } from "core/hooks/custom-hooks";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import usePasswordManager from "core/hooks/usePasswordManager";
import useAuthManager from "core/hooks/use-auth-manager";
import useUserService from "../user-service";
import { PasswordChange, PasswordChangeSchema } from "../schema";


const ChangePassword = () => {
    const { changePassword, loading } = useUserService();
    const { setUser } = useAuth();
    const [showCurrentPassword, toggleCurrentPassword] = useToggle();
    const [showPassword, togglePasswordVisibility] = useToggle();
    const { formState, handleChange, reset } = useFormManager({initialState: {} as PasswordChange});
    const { register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(PasswordChangeSchema)});
    const { promptPasswordChange } = usePasswordManager();
    const { logout } = useAuthManager();
    
    const handleChangePassword = async () => {
        const response = await changePassword(formState);
        
        if(response.header.responseCode === "0"){
            reset();
            setUser(response.body.data);
        }
    }

    return(
        <form onSubmit={handleSubmit(handleChangePassword)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        placeholder="Current password"
                        label="Current password"
                        fullWidth
                        type={showCurrentPassword ? "text" : "password"}
                        {...register("currentPassword")}
                        value={formState?.currentPassword ?? ""}
                        onChange={handleChange}
                        error={errors?.currentPassword ? true : false}
                        helperText={errors.currentPassword?.message as string}
                        InputProps={{
                            endAdornment: <Tooltip title={showCurrentPassword ? "Hide Password" : "Show Password"}>
                                <IconButton onClick={toggleCurrentPassword}>
                                   {showCurrentPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </IconButton>
                            </Tooltip>
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        placeholder="New password"
                        label="New password"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        value={formState?.password ?? ""}
                        onChange={handleChange}
                        error={errors?.password ? true : false}
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
                    <TextField
                        placeholder="Confirmed password"
                        label="Confirmed password"
                        fullWidth
                        type="password"
                        {...register("confirmedPassword")}
                        value={formState?.confirmedPassword ?? ""}
                        onChange={handleChange}
                        error={errors?.confirmedPassword ? true : false}
                        helperText={errors.confirmedPassword?.message as string}
                    />
                </Grid>
                <Grid item xs={12} sx={{mt:2}}>
                    <Stack direction="row">
                        <LoadingButton variant="contained" type="submit" loading={loading}>Submit</LoadingButton>
                        <Box sx={{ flexGrow: 1}} />
                        {promptPasswordChange && <Button onClick={logout}>Logout</Button>}
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default ChangePassword;