import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import routes from "utils/routes";
import { AccountBalance, Book, DashboardCustomize, Grade, Home, LibraryBooks, People, Scale, SelectAll } from "@mui/icons-material";

export const devMenuItems = [
    {
        icon: Home,
        title: "Dashboard",
        route: routes.dashboard,
    },
    {
        icon: ReceiptLongOutlinedIcon,
        title: "Applications",
        route: routes.application.index,
    },
    {
        icon: AccountBalance,
        title: "Departments",
        route: routes.department.index,
    },
    {
        icon: People,
        title: "Student",
        route: routes.students.index,
    },
    {
        icon: PaymentOutlinedIcon,
        title: "Awards",
        route: routes.awards.index,
    },
    {
        icon: SelectAll,
        title: "Courses",
        route: routes.courses.index,
    },
    {
        icon: SelectAll,
        title: "Classes",
        route: routes.classes.index,
    },
    {
        icon: LibraryBooks,
        title: "Modules",
        route: routes.modules.index,
    },
    {
        icon: People,
        title: "Staff",
        route: routes.staff.index,
    },
    {
        icon: DashboardCustomize,
        title: "Results",
        route: routes.results.index,
    },
    {
        icon: Grade,
        title: "Grades",
        route: routes.grades.index,
    },
    {
        icon: PeopleOutlinedIcon,
        title: "Users",
        route: routes.users.index,
    },
];

export const AdminMenuItems = [
    {
        icon: Home,
        title: "Dashboard",
        route: routes.dashboard,
    },
    {
        icon: ReceiptLongOutlinedIcon,
        title: "Applications",
        route: routes.application.index,
    },
    {
        icon: AccountBalance,
        title: "Departments",
        route: routes.department.index,
    },
    {
        icon: PaymentOutlinedIcon,
        title: "Awards",
        route: routes.awards.index,
    },
    {
        icon: SelectAll,
        title: "Courses",
        route: routes.courses.index,
    },
    {
        icon: SelectAll,
        title: "Classes",
        route: routes.classes.index,
    },
    {
        icon: LibraryBooks,
        title: "Modules",
        route: routes.modules.index,
    },
    {
        icon: People,
        title: "Staff",
        route: routes.staff.index,
    },
    {
        icon: Grade,
        title: "Grades",
        route: routes.grades.index,
    },
    {
        icon: People,
        title: "Student",
        route: routes.students.index,
    },
    {
        icon: PeopleOutlinedIcon,
        title: "Users",
        route: routes.users.index,
    },
];

export const StudentMenu = [
    {
        icon: Home,
        title: "Dashboard",
        route: routes.dashboard,
    },
    {
        icon: People,
        title: "Student",
        route: routes.students.index,
    },
    {
        icon: DashboardCustomize,
        title: "Results",
        route: routes.results.index,
    },
];


export const StaffMenu = [
    {
        icon: Home,
        title: "Dashboard",
        route: routes.dashboard,
    },
    {
        icon: DashboardCustomize,
        title: "Results",
        route: routes.results.index,
    },
];


export const MenuItems = [
    {
        icon: Home,
        title: "Dashboard",
        route: routes.dashboard,
    },
    {
        icon: DashboardCustomize,
        title: "Results",
        route: routes.results.index,
    },
];
