import * as Yup from "yup";

const DepartmentSchema = Yup.object({
    id: Yup.number().typeError("Invalid Id").default(0).optional(),
    name: Yup.string().required("Please provide department Name"),
    code: Yup.string()
    .min(2, "Invalid Department Code")
    .max(3, "Invalid Department Code")
    .required("Department Short Code is required")
});

export { DepartmentSchema };

type Department = Yup.InferType<typeof DepartmentSchema>;

export default Department;