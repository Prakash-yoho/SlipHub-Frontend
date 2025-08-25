import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EmployeeProfile } from "../../../Type/Emp_profile/Type"


const payrollSlice = createSlice({
    name: "payroll",
    initialState: { data: [], employee: [], selectedEmp: {} },
    reducers: {
        getAllpayroll: (state, action) => {
            state.data = action.payload
        },
        getPayrollEmp: (state, action) => {
            state.employee = action.payload
        },
        selectedEmp: (state, action: PayloadAction<EmployeeProfile>) => {
            state.selectedEmp = action.payload
        }
    }
})

export const { getAllpayroll, getPayrollEmp, selectedEmp } = payrollSlice.actions

export default payrollSlice.reducer