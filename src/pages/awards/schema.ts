import * as Yup from "yup";

const AwardSchema = Yup.object({
    id: Yup.number().integer().default(0).optional(),
    title: Yup.string().required("Please provide National Award Title"),
    level: Yup.number().min(1, "Please provide a valid national award level")
        .max(12, "Invalid NTA :evel").required("NTA Level is required"),
    semesters: Yup.number().default(2).min(2, "Invalid Number of semesters").max(6, "Maximum number of semesters can not exceed 6")
        .required("Number of semesters is required")
});

export { AwardSchema };

type Award = Yup.InferType<typeof AwardSchema>;

export default Award;
