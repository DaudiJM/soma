import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CCard from "core/components/Cards"
import { useForm } from "react-hook-form";
import Grade, { GradeSchema } from "../schema";
import useFormManager from "core/hooks/use-form";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Award from "pages/awards/schema";
import { useEffect, useState } from "react";
import useAwardService from "pages/awards/award-service";
import useGradeService from "../grade-service";

const AddGradePage = () => {
    const [awards, setAwards] = useState<Award[]>([]);
    const { getAwards } = useAwardService();
    const { createGrade } = useGradeService();
    const { formState, handleChange, handleElementChange, reset } = useFormManager<Grade>({initialState: {} as Grade})
    const { register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(GradeSchema)});

    const loadData = async () => {
        const response = await getAwards();
        if(response.header.responseCode == "0"){
            setAwards(response.body.data);
            handleElementChange("awardLevel", response.body.data[0].level);
        }
    }

    const handleformSubmit = async () => {
        // console.log(formState);
        const response = await createGrade(formState);
        if(response.header.responseCode == "0"){
            reset();
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return(
        <CCard 
            title="Add Grade"
            children={
                <Box>
                    <form onSubmit={handleSubmit(handleformSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={2}>
                                    <TextField 
                                        label="Grade"
                                        placeholder="Grade"
                                        {...register("grade")}
                                        value={formState?.grade ?? ""}
                                        error={errors.grade ? true : false}
                                        helperText={errors.grade?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Minimum Value"
                                        placeholder="Minimum Value Eg: 81"
                                        {...register("minimum")}
                                        value={formState?.minimum ?? ""}
                                        error={errors.minimum ? true : false}
                                        helperText={errors.minimum?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Maximum Value"
                                        placeholder="Maximu Value Eg: 100"
                                        {...register("maximum")}
                                        value={formState?.maximum ?? ""}
                                        error={errors.maximum ? true : false}
                                        helperText={errors.maximum?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Stack spacing={2}>
                                    <TextField 
                                        label="Points"
                                        placeholder="Points"
                                        {...register("points")}
                                        value={formState?.points ?? ""}
                                        error={errors.points ? true : false}
                                        helperText={errors.points?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField 
                                        label="Remarks"
                                        placeholder="Remarks Eg: Good"
                                        {...register("remarks")}
                                        value={formState?.remarks ?? ""}
                                        error={errors.remarks ? true : false}
                                        helperText={errors.remarks?.message as string}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>NTA Level</InputLabel>
                                        <Select
                                            label="NTA Level"
                                            {...register("awardLevel")}
                                            value={formState?.awardLevel ?? awards.length > 0 ? awards[0].level : 0}
                                            error={errors.awardLevel ? true : false}
                                            onChange={(e) => handleElementChange(e.target.name, e.target.value)}
                                        >
                                            { awards.length > 0 ? 
                                            awards.map(award => <MenuItem value={award.level} key={award.id}>NTA Level {award.level}</MenuItem>) : <MenuItem value={0}>Choose NTA Level</MenuItem>}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton variant="contained" type="submit">
                                    Submit
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            }
        />
    );
}

export default AddGradePage;