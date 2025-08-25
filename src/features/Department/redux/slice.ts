import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type DepartmentType } from '../../../Type/Department/Type'

const department: DepartmentType = {
    dpt_id:123,
    uuid:"",
    dpt_name:"",
    dpt_head:"",
    no_of_emp:0,
    emp_list:[],
    hr:"",
    company:"",
    is_active:false,
    is_delete:false,
}

const data: DepartmentType[] = []

const DepartmentSlice = createSlice({
    name: "DepartmentSlice",
    initialState: { department, data },
    reducers: {
        getDepartment: (state, action) => {
            state.data = action.payload
        },
        addAndUpdateDepartment: (state, action: PayloadAction<DepartmentType>) => {
            const data = action.payload

            const index = state.data.findIndex((item: DepartmentType) => item.uuid === data.uuid)

            if (index !== -1) {
                state.data[index] = data
            } else {
                state.data.unshift(data)
            }
        },
    },
})


export const { addAndUpdateDepartment, getDepartment } = DepartmentSlice.actions
export default DepartmentSlice.reducer