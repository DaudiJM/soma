import { StudentSchema } from "pages/student/schema";
import * as Yup from "yup";


const ApplicationSchema = Yup.object({
    year: Yup.string().required(),
    courseId: Yup.number().integer().default(0)
        .required("Course is required"),
    course: Yup.string().optional(),
    category: Yup.string().optional()
}).concat(StudentSchema);

export { ApplicationSchema };

type Application = Yup.InferType<typeof ApplicationSchema>;

export default Application;