import Grid from "@mui/material/Grid";
import { PagePropsInterface } from "utils/app-interfaces";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { Role } from "utils/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import useFormManager from "core/hooks/use-form";
import useUserService from "../user-service";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "core/hooks/custom-hooks";
import User, { UserSchema } from "../schema";
import Stack from "@mui/material/Stack";
import { Spacing } from "core/config/layout";
import { shouldAllow } from "utils/Utils";

type AutocompleteOption = {
    label: string;
    id: number;
}

const CreateUser:React.FC<PagePropsInterface<User>> = ({data, reload = () => {}}) => {
    const [userMerchant, setUserMerchant] = useState<AutocompleteOption | null>(null);
    const { loading, createUser, updateUser } = useUserService(); 
    const { formState, handleElementChange, handleChange, reset } = useFormManager({initialState: data});
    const { register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(UserSchema)});
    const merchantRoles = ["MERCHANT ADMINISTRATOR", "MERCHANT OPERATOR"];
    const { user } = useAuth();

    const loadUserMerchant = () => {
        if(data?.id > 0){
            if(data?.merchantId > 0){
                setUserMerchant({ id: data.merchantId, label: data?.merchant})
            }
        }
    }


    const handleCreateOrUpdateUser = async () => {
        const response = data?.id > 0 ? await updateUser(formState) : await createUser(formState);

        if(response.header.responseCode === "0"){
            if(data?.id == null){
                reset();
            }

            reload();
        }
    }

    useEffect(() => {
        return () => {};
    }, []);

    return(
        <form onSubmit={handleSubmit(handleCreateOrUpdateUser)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} xl={6}>
                    <Stack spacing={Spacing}>
                        <TextField 
                            label="Name"
                            placeholder="Name"
                            fullWidth
                            {...register("name")}
                            value={formState?.name ?? ""}
                            onChange={handleChange}
                            error={errors.name ? true : false}
                            helperText={errors.name?.message as string}
                        />
                        <TextField 
                            label="Username"
                            placeholder="Username"
                            fullWidth
                            {...register("username")}
                            value={formState?.username ?? ""}
                            onChange={handleChange}
                            error={errors.username ? true : false}
                            helperText={errors.username?.message as string}
                        />
                        <TextField 
                            label="Phone Number"
                            placeholder="Phone Number"
                            fullWidth
                            {...register("msisdn")}
                            value={formState?.msisdn ?? ""}
                            onChange={handleChange}
                            error={errors.msisdn ? true : false}
                            helperText={errors.msisdn?.message as string}
                        />
                    </Stack>
                    
                </Grid>
                <Grid item xs={12} sm={12} xl={6}>
                    <Stack spacing={Spacing}>
                        <TextField 
                            label="Email"
                            placeholder="Email"
                            fullWidth
                            {...register("email")}
                            value={formState?.email ?? ""}
                            onChange={handleChange}
                            error={errors.email ? true : false}
                            helperText={errors.email?.message as string}
                        />
                        <FormControl fullWidth error={errors.role ? true : false}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                placeholder="Role"
                                {...register("role")}
                                value={formState?.roles[0] ?? " "}
                                onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                            >
                                <MenuItem value=" ">Select Role</MenuItem>
                                {user?.roles[0] === Role.ADMINISTRATOR ? 
                                    Object.values(Role).map((role) => <MenuItem value={role} key={role}>{role}</MenuItem>) : 
                                    merchantRoles.map((role) => <MenuItem value={role} key={role}>{role}</MenuItem>)}
                            </Select>
                            <FormHelperText>{ errors.role?.message as string }</FormHelperText>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton type="submit" variant="contained" loading={loading}>Submit</LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
}

export default CreateUser;