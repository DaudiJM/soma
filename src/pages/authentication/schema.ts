import * as Yup from "yup";
import { MsisdnRegex } from "utils/Utils";

const AuthenticationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});

const PasswordResetSchema = Yup.object({
    msisdn: Yup.string().matches(MsisdnRegex).required("Phone number is required")
});

export type TAuthentication = Yup.InferType<typeof AuthenticationSchema>;

export type PasswordReset = Yup.InferType<typeof PasswordResetSchema>;

export { AuthenticationSchema, PasswordResetSchema };
