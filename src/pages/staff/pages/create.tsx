import useDepartmentService from "pages/department/department-service";
import Department from "pages/department/schema"
import { useEffect, useState } from "react"
import useStaffService from "../staff-service";
import useFormManager from "core/hooks/use-form";
import { useForm } from "react-hook-form";
import Staff, { StaffSchema } from "../schema";
import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateStaffPage = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const { getDepartments } = useDepartmentService();
    const { createStaff, loading } = useStaffService();
    const { formState, handleChange, handleElementChange, reset } = useFormManager<Staff>({initialState: {} as Staff});
    const { register, handleSubmit, formState: { errors }} = useForm<Staff>({resolver: yupResolver(StaffSchema)});

    const loadData = async () => {
        const response = await getDepartments();
        if(response.header.responseCode === "0"){
            setDepartments(response.body.data);
            handleElementChange("departmentId", response.body.data[0]?.id);
        }
    }

    const handleformSubmit = async (data: Staff) => {
        // console.log(data);
        const response= createStaff(data);
        if((await response).header.responseCode === "0"){
            reset();
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return(
        <Box>
            <CCard 
                title="Add Staff"
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
                                        label="Last Name"
                                        placeholder="Last Name"
                                        {...register("lastName")}
                                        value={formState?.lastName ?? ""}
                                        error={errors.lastName ? true : false}
                                        helperText={errors.lastName?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
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
                                        label="Address"
                                        placeholder="Address"
                                        {...register("address")}
                                        value={formState?.address ?? ""}
                                        error={errors.address ? true : false}
                                        helperText={errors.address?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={3}>
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
                                        label="Email"
                                        placeholder="example@gmail.com"
                                        {...register("email")}
                                        value={formState?.email ?? ""}
                                        error={errors.email ? true : false}
                                        helperText={errors.email?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Departments</InputLabel>
                                        <Select
                                            label="Departments"
                                            {...register("departmentId")}
                                            value={formState?.departmentId ?? departments[0]?.id ?? 0}
                                            error={errors.departmentId ? true : false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            {departments.length > 0 ? departments.map(department => 
                                                <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>) : 
                                                <MenuItem value={0}>Choose Department</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
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

export default CreateStaffPage;