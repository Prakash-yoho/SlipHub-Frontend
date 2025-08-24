export const API_ENDPOINTS = {
    auth: {
        login: "/api/auth/login",
        verify_otp: "/api/auth/verify-otp",
        register: "/api/auth/register",
    },
    hr: {
        create: "/api/hr/create",
        getAll: "/api/hr/all",
        update: "/api/hr/update/:uuid",
        delete: "/api/hr/delete/:uuid"
    },
    employee: {
        create: "/api/employee/create",
        getAll: "/api/employee/all",
        getById: "/api/employee/get/:uuid",
        update: "/api/employee/update/:uuid",
        delete: "/api/employee/delete/:uuid"
    },
    department: {
        create: "/api/department/create",
        getAll: "/api/department/all"
    },
    common: {
        getdpt: "/api/common/department/all"
    }
}