import * as Yup from "yup";
import { MsisdnRegex, PasswordRegex } from "utils/Utils";

const UserSchema = Yup.object({
    id: Yup.number().default(0).optional(),
    name: Yup.string().min(2, "Please provide a valid name").required("Name is required"),
    username: Yup.string().min(2, "Please provide a valid username").required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    msisdn: Yup.string().matches(MsisdnRegex, "Please provide a valid phone number").required("Phone number is required"),
    roles: Yup.array().of(Yup.string()).required("Role is required"),
    merchant: Yup.string().default("Head Office").optional(),
    lastLoginDate: Yup.string().default("No date specified").optional(),
    lastPasswordChangeDate: Yup.string().default("No date specified").optional(),
    merchantId: Yup.number().default(0).optional(),
    status: Yup.string().default("DEFAULT").optional()
});

const PasswordChangeSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string().matches(PasswordRegex, "Password should contain at least 1 capital, 1 special charecter and 1 digit").required("Password is required"),
    confirmedPassword: Yup.string().oneOf([Yup.ref("password")], "Password do not match").required("Please confirm password")
});

const PUserSchema = Yup.object({
    name: Yup.string().min(2, "Please provide a valid name").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    msisdn: Yup.string().matches(MsisdnRegex, "Please provide a valid phone number").required("Phone number is required"),
})
type User = Yup.InferType<typeof UserSchema>;

export type PasswordChange = Yup.InferType<typeof PasswordChangeSchema>;

export { PasswordChangeSchema, UserSchema, PUserSchema };

export default User;
