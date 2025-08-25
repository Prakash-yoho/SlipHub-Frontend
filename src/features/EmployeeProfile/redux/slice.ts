import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EmployeeProfile } from "../../../Type/Emp_profile/Type"

const data: EmployeeProfile[] = []
const selectedEmployee: EmployeeProfile = {}

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState: { data, selectedEmployee },
    reducers: {
        getAllemployee: (state, action) => {
            state.data = action.payload
        },
        addAndUpdateEmployee: (state, action: PayloadAction<EmployeeProfile>) => {
            const data = action.payload

            const index = state.data.findIndex((item: EmployeeProfile) => item.uuid === data.uuid)

            if (index !== -1) {
                state.data[index] = data
            } else {
                state.data.unshift(data)
            }
        },
        deleteEmployeeDetails: (state, action: PayloadAction<string>) => {
            const data = action.payload
            const index = state.data.findIndex((item: EmployeeProfile) => item.uuid === data)
            state.data.splice(index, 1)
        },
        getOneemployee: (state, action) => {
            state.selectedEmployee = action.payload
        }
    }
})

export const { getAllemployee, addAndUpdateEmployee, deleteEmployeeDetails, getOneemployee } = employeeSlice.actions

export default employeeSlice.reducer