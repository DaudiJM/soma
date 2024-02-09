import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useAuth } from "core/hooks/custom-hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import CCard from "core/components/Cards";
import useFormManager from "core/hooks/use-form";
import useUserService from "../user-service";
import { PUserSchema } from "../schema";

const UpdateUserPage = () => {
    const { updateUser, loading } = useUserService();
    const { user, setUser } = useAuth();
    const { formState, handleChange } = useFormManager({initialState: user});
    const { register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(PUserSchema)});

    const handleUserUpdate = async () => {
       
        const response = await updateUser(formState);
        
        if(response.header.responseCode === "0"){
            setUser(response.body.data);
        }
        
    }

    return(
        <CCard title="Update Profile">
            <form onSubmit={handleSubmit(handleUserUpdate)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton variant="contained" type="submit" loading={loading}>Submit</LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </CCard>
    );
}


export default UpdateUserPage;