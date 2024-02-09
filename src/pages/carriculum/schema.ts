import * as Yup from "yup";

const CurriculumSchema = Yup.object({
    id: Yup.number().optional().default(0),
    courseId: Yup.number().default(0).optional(),
    moduleCode: Yup.string().default("").optional(),
    moduleTitle: Yup.string().default(""),
    moduleCategory: Yup.string().default(""),
    status: Yup.string().default(""),
    createdAt: Yup.string().default("").optional(),
    updatedAt: Yup.string().default("").optional(),
    course: Yup.string().default("").optional(),
    awardLevel: Yup.string().default("").optional(),
    semester: Yup.string().default("").optional(),
    moduleId: Yup.number().default(0).optional(),
})

const CourseCurriculumSchema = Yup.object({
    id: Yup.number().optional().default(0),
    course: Yup.string().optional(),
    modules: Yup.array<Curriculum>().default([]),
});

export { CurriculumSchema, CourseCurriculumSchema };

export type Curriculum = Yup.InferType<typeof CurriculumSchema>;

type CourseCurriculum = Yup.InferType<typeof CourseCurriculumSchema>;

export default CourseCurriculum;