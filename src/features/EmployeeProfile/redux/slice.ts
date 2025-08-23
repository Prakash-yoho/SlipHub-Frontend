import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EmployeeProfile } from "../../../Type/Emp_profile/Type"

const employeeAll: EmployeeProfile[] = []

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState: { employeeAll },
    reducers: {
        getAllemployee: (state, action) => {
            state.employeeAll = action.payload
        },
        addEmployee: (state, action: PayloadAction<EmployeeProfile>) => {
            state.employeeAll = [...state.employeeAll, action.payload]
        },
    }
})

export const { getAllemployee, addEmployee } = employeeSlice.actions

export default employeeSlice.reducer