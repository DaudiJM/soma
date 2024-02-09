import { CourseModule } from "pages/modules/schema";
import * as Yup from "yup";

const CourseSchema = Yup.object({
    id: Yup.number().integer().default(0).optional(),
    title: Yup.string().required("Course Title is required"),
    code: Yup.string()
        .min(2, "Invalid Course Code").max(4, "Invalid Course Code")
        .required("Course Code is required"),
    departmentId: Yup.number()
        .integer().default(0)
        .typeError("Invcalid Department")
        .required("Select department"),
    status: Yup.string().default("").optional(),
    department: Yup.string().default("").optional(),
    courseWorkScore: Yup.number().typeError("Invalid Score value").default(0).optional(),
    finalExaminationScore: Yup.number().typeError("Invalid Score value").default(0).optional(),
});

const CourseCarriculumSchema = Yup.object({
    id: Yup.number().default(0).optional(),
    course: Yup.string().default("").optional(),
    modules: Yup.array<CourseModule>().default([] as CourseModule[]).optional()
});

const CourseScoreSchema = Yup.object({
    courseWorkScore: Yup.number().typeError("Invalid Score value").default(0).optional(),
    finalExaminationScore: Yup.number().typeError("Invalid Score value").default(0).optional(),
});

const CourseAssignmentSchema = Yup.object({
    entityId: Yup.number().optional(),
    targetsIds: Yup.array<Number>().optional(),
})

export { CourseSchema, CourseCarriculumSchema, CourseScoreSchema, CourseAssignmentSchema };

type Course = Yup.InferType<typeof CourseSchema>;

export type CourseCarriculum = Yup.InferType<typeof CourseCarriculumSchema>;

export type CourseScore = Yup.InferType<typeof CourseScoreSchema>;

export type CourseAssignment = Yup.InferType<typeof CourseAssignmentSchema>;

export default Course;
