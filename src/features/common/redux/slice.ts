import {createSlice} from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name:"common",
    initialState:{
        department:[],
    },
    reducers:{
        getAllDepartment:(state,action)=>{
            state.department = action.payload
        },
    }
})

export const {getAllDepartment} = commonSlice.actions

export default commonSlice.reducer
