
const routes = {
    index: "/",
    dashboard: "/dashboard",
    profile: "/profile",
    authentication: {
        forgotPassword: "/forgotPassword",
        register: "/register",
    },
    users: {
        index: "/users",
        details: "/users/:id",
    },
    application: {
        index: "/applications",
        add: "/applications/add",
        details: "/applications/:id",
    },
    department: {
        index: "/department",
        details: "/department/:id",
        add: "/department/add",
    },
    courses: {
        index: "/courses",
        add: "/courses/add",
        details: "/courses/:id",
        modules: "/courses/:id/modules",
    },
    students: {
        index: "/students",
        details: "/students/:id",
    },
    awards: {
        index: "/awards",
        add: "/awards/add",
        details: "/awards/:id",
    },
    modules: {
        index: "/modules",
        add: "/modules/add",
        details: "/modules/:id",
    },
    classes: {
        index: "/classes",
        add: "/classes/add",
        details: "/classes/:id",
    },
    staff: {
        index: "/staff",
        add: "/staff/add",
        details: "/staff/:id",
    },
    grades: {
        index: "/grades",
        add: "/grades/add",
        details: "/grades/:id",
    },
    
    help_center: {
        index: "/help_center",
    },
    errors: {
        underConstruction: "/under-construction",
        notFound: "/404",
        forbidden: "/403",
    },
    help: {
        index: "/help",
    },
    results: {
        index: "/results",
        studentSemester: "/results/student",
        upload: "/results/upload/:classId/:moduleId/:category"
    }
};

export default routes;