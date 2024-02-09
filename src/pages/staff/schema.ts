import Class from "pages/class/schema";
import { CourseModule } from "pages/modules/schema";
import { MsisdnRegex } from "utils/Utils";
import { Role } from "utils/enums";
import * as Yup from "yup";

const StaffSchema = Yup.object({
    id: Yup.number().integer().typeError("Invalid Staff").default(0).optional(),
    firstName: Yup.string().required("Please provide Staff first Name"),
    lastName: Yup.string().required("Please provide Staff Last Name"),
    middleName: Yup.string().default("").optional(),
    gender: Yup.string().required("Please Select Staff Gender"),
    email: Yup.string().email("Please Provide a valid email").required("Please Provide Staff Email"),
    phoneNumber: Yup.string().matches(MsisdnRegex, "Phone Number Should match the pattern 255XXXXXXXXX").required("Plaese provide staff Phone Number"),
    departmentId: Yup.number().typeError("Invalid Department").min(1, "Please Select department").required("Please select Department"),
    address: Yup.string().optional(),
    status: Yup.string().default("DEFAULT").optional()
});

const LecturerClassesSchema = Yup.object({
    lecturerId: Yup.number().default(0).optional(),
    programmes: Yup.array<Class>().default([]).optional()
});

const StaffRoleSchema = Yup.object({
    id: Yup.number().default(0).optional(),
    roles: Yup.array<String>().default([]).optional()
});

const StaffModuleSchema = Yup.object({
    staffId: Yup.number().default(0).optional(),
    modulesIds: Yup.array<Number>().default([]).optional(),
    courseModules: Yup.array<CourseModule>().default([]).optional()
})

export { StaffSchema, StaffRoleSchema, StaffModuleSchema };

type Staff = Yup.InferType<typeof StaffSchema>;

export type StaffRole = Yup.InferType<typeof StaffRoleSchema>;

export type LecturerClasses = Yup.InferType<typeof LecturerClassesSchema>;

export type StaffModule = Yup.InferType<typeof StaffModuleSchema>;

export default Staff;