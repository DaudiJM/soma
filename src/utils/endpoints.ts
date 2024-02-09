
const Endpoints = {
    users: {
        index: "/user",
        getAll: "/user/list",
        changeStatus: "/users/change-status",
        reset: "/users/reset",
        search: "/users/search",
        changePassword: "/users/change-password",
    },
    charges: {
        index: "/charges",
        changeStatus: "/charges/change-status",
        search: "/charges/search",
    },
    bills: {
        index: "/bills",
        changeStatus: "/bills/change-status",
        search: "/bills/search",
    },
    payments: {
        index: "/payments",
    },
    students: {
        getAll: "/student/list",
        changeStatus: "/merchants/change-status",
        search: "/merchants/search",
    },
    departments: {
        index: "/department/",
        create: "/department/create",
        getAll: "/department/list",
        changeStatus: "/department/change-status",
        search: "/department/search",
    },
    application: {
        getAll: "/application/list",
        apply: "/application/create",
        enroll: "/application/enroll"
    },
    awards: {
        create: "/award/create",
        getAll: "/award/list",
        changeStatus: "/award/change-status",
        search: "/award/search",
    },
    course: {
        index: "/course/",
        getAll: "/course/list",
        create: "/course/create",
        changeStatus: "/course/change-status",
        search: "/course/search",
        update: "/course/update",
    },
    modules: {
        index: "/module",
        create: "/module/create",
        getAll: "/module/list",
        changeStatus: "/module/change-status",
        search: "/module/search",
        assign: "/module/assign-lecturer",
    },
    classes: {
        index: "/programme/",
        create: "/programme/create",
        getAll: "/programme/list",
        changeStatus: "/programme/change-status",
        search: "/programme/search",
    },
    staff: {
        index: "/staff/",
        create: "/staff/create",
        getAll: "/staff/list",
        changeStatus: "/staff/change-status",
        search: "/staff/search",
        assign: "/staff/assign-roles",
    },
    grades: {
        create: "/grade/create",
        getAll: "/grade/list",
        changeStatus: "/grade/change-status",
        search: "/grade/search",
    },
    authentication: {
        index: "/authentication",
        refresh: "/authentication/refresh",
    },
    results: {
        uploadCa: "/result/upload/ca",
        uploadFe: "/result/upload/fe"
    },
    carriculum: {
        course: "/curriculum/",
        set: "/curriculum/set",
    }
}

export default Endpoints;