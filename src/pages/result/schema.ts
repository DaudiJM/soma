import { StudentSchema } from "pages/student/schema";
import * as Yup from "yup";

const SemesterResultShema = Yup.object({
    id: Yup.number().default(0).optional(),
    registrationNumber: Yup.string()
        .required("Student registration number is required"),
    score: Yup.number().typeError("Invalid Score")
        .required("Score is required")
});

const StudentModuleResultShema = Yup.object({
    id: Yup.number().default(0).optional(),
    name: Yup.string().default("").optional(),
    registrationNumber: Yup.string().required("Student registration number"),
    ca: Yup.number().default(0).optional(),
    fe: Yup.number().default(0).optional(),
    grade: Yup.string().optional(),
    status: Yup.string().optional(),
    moduleCode: Yup.string().optional(),
    moduleTitle: Yup.string().optional(),
});

const ClassModuleResultSchema = Yup.object({
    id: Yup.number().default(0).optional(),
    moduleCode: Yup.string().required("Module Code is required"),
    moduleTitle: Yup.string().optional(),
    programme: Yup.string().optional(),
    programmeId: Yup.number().default(0).optional(),
    results: Yup.array<StudentModuleResult>().default([]).optional(),
});

const StudentSemesterResultSchema = Yup.object({
    id: Yup.number().default(0).optional(),
    student: StudentSchema,
    year: Yup.string().optional(),
    awardLevel: Yup.number().optional(),
    semester: Yup.number().default(1).optional(),
    semesterGpa: Yup.number().optional(),
    status: Yup.string().optional(),
    results: Yup.array<StudentModuleResult>().default([]).optional()
});

export { SemesterResultShema, StudentModuleResultShema, ClassModuleResultSchema, StudentSemesterResultSchema };

export type StudentModuleResult = Yup.InferType<typeof StudentModuleResultShema>;

export type ClassModuleResult = Yup.InferType<typeof ClassModuleResultSchema>;

export type StudentSemesterResult = Yup.InferType<typeof StudentSemesterResultSchema>;


