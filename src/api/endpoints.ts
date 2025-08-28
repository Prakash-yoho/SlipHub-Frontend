
export const API_ENDPOINTS = {
    auth: {
        login: "/api/auth/login",
        verify_otp: "/api/auth/verify-otp",
        register: "/api/auth/register",
    },
    hr: {
        create: `/api/hr/:companyid/create`,
        getAll: `/api/hr/:companyid/all`,
        update: `/api/hr/:companyid/update/:uuid`,
        delete: `/api/hr/:companyid/delete/:uuid`,
        getone: `/api/hr/:companyid/get/:uuid`
    },
    employee: {
        create: `/api/employee/:companyid/create`,
        getAll: `/api/employee/:companyid/all`,
        getById: `/api/employee/:companyid/get/:uuid`,
        update: `/api/employee/:companyid/update/:uuid`,
        delete: `/api/employee/:companyid/delete/:uuid`
    },
    department: {
        create: `/api/department/:companyid/create`,
        getAll: `/api/department/:companyid/all`,
        delete: `api/department/:companyid/delete/:uuid`
    },
    common: {
        getdpt: `/api/common/:companyid/department/all`,
        dashboad: `/api/dashboard/:companyid`
    },
    payroll: {
        getemp: `/api/payroll/:companyid/employee`,
        create: `/api/payroll/:companyid/generate`,
        download: `/api/payroll/:companyid/slip/:uuid/download`,
        downloadMonth: '/api/payroll/:companyid/download/:date/:employee',
    }
}