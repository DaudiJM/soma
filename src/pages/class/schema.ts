import * as Yup from "yup";

const ClassSchema = Yup.object({
    id: Yup.number().integer().default(0).optional(),
    name: Yup.string().required("Please Provide Class Name"),
    startingYear: Yup.string().required("Please provide Class Starting Year"),
    semester: Yup.number()
        .min(1, "Minimum Number for Semester should be 1")
        .max(2, "Semester for Year should not exceed 2").required("Please Provide the Current semester for Class for specified year"),
    year: Yup.number().min(1, "Minimum value for Year should not be less than 1").max(4, "Maximum value for Year should not be greater than 4").required("Please provide Class Current Year. Eg. 1"),
    courseId: Yup.number().min(1, "Plaease Choose Course form Class").required("Please choose Course for Class"),
    awardLevel: Yup.number().min(1, "Please Choose NTA level for Class").required("Please Choose NTA level for Class"),
    status:Yup.string().default("").optional(),
});

export { ClassSchema };

type Class = Yup.InferType<typeof ClassSchema>;

export default Class;