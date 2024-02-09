import { Navigate, Route, Routes } from "react-router-dom";
import Forbidden from "./core/pages/Forbidden";
import UnderConstructions from "./core/pages/UnderConstructions";
import NotFound from "./core/pages/NotFound";
import useRefresh from "core/hooks/useRefresh";
import Layout from "core/layout/layout";
import PrivateRoute from "core/components/RequireAuth";
import HomePage from "pages/home/pages";
import Profile from "pages/user/pages/profile";
import AuthLayout from "core/layout/layout/auth-layout";
import ForgotPasswordPage from "pages/authentication/pages/forgot-password";
import LoginPage from "pages/authentication/pages";
import routes from "utils/routes";
import { Role } from "utils/enums";
import RegisterPage from "pages/authentication/pages/register";
import ApplicationPage from "pages/application/pages";
import StudentsPage from "pages/student/pages";
import DepartmentsPage from "pages/department/pages";
import AwardsPage from "pages/awards/pages";
import CoursesPage from "pages/course/pages";
import ModulesPage from "pages/modules/pages";
import ClassesPage from "pages/class/pages";
import StaffPage from "pages/staff/pages";
import GradesPage from "pages/grade/pages";
import UsersPage from "pages/user/pages";
import AddGradePage from "pages/grade/pages/add";
import CreateDepartment from "pages/department/pages/create";
import CreateAwardPage from "pages/awards/pages/create";
import CreateCoursePage from "pages/course/pages/create";
import CreateClassPage from "pages/class/pages/create";
import CreateModulePage from "pages/modules/pages/create";
import CreateStaffPage from "pages/staff/pages/create";
import CreateApplicationPage from "pages/application/pages/add-application";
import LecturerResultsPage from "pages/result/pages/lecturer-result-page";
import ResultPage from "pages/result/pages";
import StudentSemesterResultPage from "pages/result/pages/student-semester-result-page";
import CourseDetailsPage from "pages/course/pages/course-details-page";
import CourseModulePage from "pages/course/pages/course-module-page";
import StaffDetails from "pages/staff/pages/details";
import ClassDetailsPage from "pages/class/pages/details";
import UploadResultPage from "pages/result/pages/upload-result-page";

const publicRoutes = [
  {
    path: routes.dashboard,
    element: <HomePage />
  },
  {
    path: routes.application.index,
    element: <ApplicationPage />
  },
  {
    path: routes.application.add,
    element: <CreateApplicationPage />
  },
  {
    path: routes.students.index,
    element: <StudentsPage />
  },
  {
    path: routes.department.index,
    element: <DepartmentsPage />
  },
  {
    path: routes.department.add,
    element: <CreateDepartment />
  },
  {
    path: routes.awards.index,
    element: <AwardsPage />
  },
  {
    path: routes.awards.add,
    element: <CreateAwardPage />
  },
  {
    path: routes.classes.index,
    element: <ClassesPage />
  },
  {
    path: routes.classes.details,
    element: <ClassDetailsPage />
  },
  {
    path: routes.classes.add,
    element: <CreateClassPage />
  },
  {
    path: routes.staff.index,
    element: <StaffPage />
  },
  {
    path: routes.staff.details,
    element: <StaffDetails />
  },
  {
    path: routes.staff.add,
    element: <CreateStaffPage />
  },
  {
    path: routes.modules.index,
    element: <ModulesPage />
  },
  {
    path: routes.modules.add,
    element: <CreateModulePage />
  },
  {
    path: routes.profile,
    element: <Profile />
  },
  {
    path: routes.courses.index,
    element: <CoursesPage />
  },
  {
    path: routes.courses.details,
    element: <CourseDetailsPage />
  },
  {
    path: routes.courses.modules,
    element: <CourseModulePage />
  },
  {
    path: routes.courses.add,
    element: <CreateCoursePage />
  },
  {
    path: routes.grades.index,
    element: <GradesPage />
  },
  {
    path: routes.grades.add,
    element: <AddGradePage />
  },
  {
    path: routes.users.index,
    element: <UsersPage />
  },
  {
    path: routes.errors.underConstruction,
    element: <UnderConstructions />
  },
  {
    path: routes.errors.notFound,
    element: <NotFound />
  },
  {
    path: routes.errors.forbidden,
    element: <Forbidden />
  },
  {
    path: routes.results.index,
    element: <ResultPage />
  },
  {
    path: routes.results.upload,
    element: <UploadResultPage />
  },
  {
    path: routes.results.studentSemester,
    element: <StudentSemesterResultPage />
  },
  
];

const adminRoutes = [
  // {
  //   path: routes.merchants.index,
  //   element: <MerchantPage />
  // },
  // {
  //   path: routes.merchants.details,
  //   element: <MerchantDetails />
  // },
  // {
  //   path: routes.users.index,
  //   element: <UsersPage />
  // },
  // {
  //   path: routes.users.details,
  //   element: <UserDetails />
  // },
  {
    path: routes.dashboard,
    element: <HomePage />
  },
];


const AppRoutes = () => {
  // useRefresh();

  return (
    <Routes>
        <Route element={<Layout />}>
          {/* <Route element={<PrivateRoute allowedRoles={[Role.ADMINISTRATOR, Role.OPERATOR]}/>}>
            {adminRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)}
          </Route>
          <Route element={<PrivateRoute allowedRoles={Object.values(Role)}/>}>
            
          </Route> */}
          {publicRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)}
            <Route path="*" element={<Navigate to="/404" replace/>}/>
        </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path={routes.authentication.register} element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
    </Routes>
  );
};

export default AppRoutes;
