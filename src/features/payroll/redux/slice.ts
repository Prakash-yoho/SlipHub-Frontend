import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EmployeeProfile } from "../../../Type/Emp_profile/Type"

const empData: EmployeeProfile = {}

const payrollSlice = createSlice({
    name: "payroll",
    initialState: { data: [], employee: [], selectedEmp: empData },
    reducers: {
        getAllpayroll: (state, action) => {
            state.data = action.payload
        },
        getPayrollEmp: (state, action) => {
            state.employee = action.payload
        },
        selectedEmp: (state, action: PayloadAction<EmployeeProfile>) => {
            state.selectedEmp = action.payload
        },
        updatePayslip: (state, action) => {
            const data = action.payload

            state.selectedEmp?.payroll_slip?.push(data)
        }
    }
})

export const { getAllpayroll, getPayrollEmp, selectedEmp, updatePayslip } = payrollSlice.actions

export default payrollSlice.reducer