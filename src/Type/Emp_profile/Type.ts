/* eslint-disable @typescript-eslint/no-explicit-any */
export type EmployeeProfile = {
    company_id?: any;
    _id?: string,
    id?: number,
    uuid?: string,
    auth_id?: string,
    emp_id?: string,
    first_name?: string,
    last_name?: string,
    contact_info?: {
        email?: string,
        phone?: string,
        address?: string,
    },
    department?: any,
    emp_role?: string,
    experience?: string,
    payroll_slip?: any[],
    ctc?: number,
    qualification?: {
        degree?: string,
        specialization?: string,
        year_of_completion?: string,
        percentage?: string
    },
    pf_acc: string,
    level_grade:string,
    join_date?: string,
    pf_active?: boolean,
    dob?: string,
    emg_contact?: string,
    father_name?: string,
    work_mode?: string,
    lpa?: number,
    image?: string,
    is_active?: boolean,
    password?: string,
}