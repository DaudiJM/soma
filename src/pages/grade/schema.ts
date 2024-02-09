import * as Yup from "yup";

const GradeSchema = Yup.object({
    grade: Yup.string()
        .max(2, "Invalid Grade")
        .required("Please provide Grade"),
    minimum : Yup.number().typeError("Invalid Value")
        .min(0, "Invalid Minimum Value")
        .lessThan(Yup.ref("maximum"), "Invalid Minimum Value")
        .required("Minimum value is required"),
    maximum: Yup.number().typeError("Invalid Value")
        .moreThan(Yup.ref("minimum"), "Invalid Maximum Value")
        .max(100, "Grade minimu Boundary can not be greater than 100").required("Please provide a maximum Boundary for Grade"),
    awardLevel: Yup.number().typeError("Invalid Value")
        .min(1, "Please Choose award Level for Grade").required("Please Choose NTA Level for the Award"),
    points: Yup.number().typeError("Invalid Value")
        .min(0, "Grade can not have Points less than 0").max(6, "Please provide a valid number for grade points").required("Please provide Grade points"),
    remarks: Yup.string().required("Please Provide Remarks for Grade Eg. 'Good'"),
});

export { GradeSchema };

type Grade = Yup.InferType<typeof GradeSchema>;

export default Grade;