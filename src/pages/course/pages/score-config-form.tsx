import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import Course, { CourseScore, CourseScoreSchema } from "../schema";
import useFormManager from "core/hooks/use-form";
import useCourseService from "../course-service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

type Props = {
    data: Course,
    onSuccess?: () => void
}

const ScoreConfigForm:React.FC<Props> = ({data, onSuccess}) => {
    const { formState, handleChange, reset } = useFormManager<CourseScore>({initialState: {courseWorkScore: data?.courseWorkScore ?? 0, finalExaminationScore: data?.finalExaminationScore ?? 0}});
    const { loading, updateCourse } = useCourseService();
    const { register, handleSubmit, formState: { errors }} = useForm<CourseScore>({resolver: yupResolver(CourseScoreSchema)});

    const handleformSubmit = async (scoreData: CourseScore) => {
        
        const course = data;
        course.courseWorkScore = scoreData.courseWorkScore;
        course.finalExaminationScore = scoreData.finalExaminationScore;

        const response = await updateCourse(course);
        if(response.header.responseCode === "0"){
            reset();
            if(onSuccess != null){
                onSuccess();
            }
        }
    }

    return(
        <form onSubmit={handleSubmit(handleformSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={3}>
                        <TextField 
                            label="Course Work Score"
                            placeholder="Course Work Score"
                            {...register("courseWorkScore")}
                            value={formState?.courseWorkScore ?? 0}
                            onChange={handleChange}
                            error={errors?.courseWorkScore ? true: false}
                            helperText={errors?.courseWorkScore?.message as string}
                        />
                        <TextField 
                            label="Final Examination Score"
                            placeholder="Final Examination Score"
                            {...register("finalExaminationScore")}
                            value={formState?.finalExaminationScore ?? 0}
                            onChange={handleChange}
                            error={errors?.finalExaminationScore ? true: false}
                            helperText={errors?.finalExaminationScore?.message as string}
                        />
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
    )
}

export default ScoreConfigForm;