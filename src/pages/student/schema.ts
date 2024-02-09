import { IndexRegex, MsisdnRegex } from "utils/Utils";
import * as Yup from "yup";

const StudentSchema = Yup.object({
    id: Yup.number().integer().default(0).optional(),
    firstName: Yup.string().required("Please Provide First Name"),
    middleName: Yup.string().required("Please Provide Middle Name"),
    lastName: Yup.string().required("Please Provide Last Name"),
    gender: Yup.string().required("Please Select Gender"),
    address: Yup.string().required("Please Provide your permanent Residential Address"),
    email: Yup.string().email("Please Provide Valid Email").required("Please Provide your Email"),
    phoneNumber: Yup.string().matches(MsisdnRegex, "Phone Number should match the Pattern 255XXXXXXXXX").required("Please Provide Phone Number"),
    guardianName: Yup.string().required("Please Provide your Guardian Full Name"),
    guardianPhoneNumber: Yup.string().matches(MsisdnRegex, "Please provide a valid Phone Number Matching Pattern 255XXXXXXXXX").required("Please Provide Guarding Phone Number"),
    guardianEmail: Yup.string().email("Please Provide a valid Email").required("Please Provide Guardian Email"),
    courseId: Yup.number().min(1, "Please Select Course").required("Please Select Course"),
    category: Yup.string().required("Please Select Application Category"),
    formFourIndexNumber: Yup.string().matches(IndexRegex, "Index Number Should Match the Pattern S0001/0001/1970").required("Please Provide your CSEE Index Number"),
    registrationNumber: Yup.string().default("").optional()
});

export { StudentSchema };

type Student = Yup.InferType<typeof StudentSchema>;

export default Student;