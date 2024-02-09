import * as Yup from "yup";

const ModuleSchema = Yup.object({
    id: Yup.number().default(0).optional(),
    title: Yup.string().required("Module Title is required"),
    code: Yup.string().min(5, "Invalid Module Code")
    .max(9, "Invalid Module Code").required("Module Code is required"),
    credits: Yup.number().min(1, "Invalid credits").required("Module Credits are required"),
    awardLevel: Yup.number().min(1, "Invalid Award Level").required("NTA Level is required"),
    departmentId: Yup.number().min(1, "Please Choose Department").required("Please Choose department where module originates"),
    semester: Yup.number()
        .integer()
        .typeError("Invalid Semetser")
        .required("Semester is required"),
    status: Yup.string().default("").optional(),
});

const CourseModuleSchema = Yup.object({
    id: Yup.number().default(0).optional(),
    moduleTitle: Yup.string().default("").optional(),
    moduleCode: Yup.string().required("Module code is required"),
    courseId: Yup.number().default(0).required("Course Id is required"),
    moduleCategory: Yup.string().optional(),
    semster: Yup.number().default(1).required(),
    course: Yup.string().default("").optional(),
    awardLevel: Yup.number().required("Award level is required")
})

export { ModuleSchema, CourseModuleSchema };

type Module = Yup.InferType<typeof ModuleSchema>;

export default Module;

export type CourseModule = Yup.InferType<typeof CourseModuleSchema>;