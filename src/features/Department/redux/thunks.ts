import type { AppDispatch } from "../../../store/store"
import type { DepartmentType } from "../../../Type/Department/Type"
import { CreateDepartmentService, DeptGetAll } from "../service"
import { addAndUpdateDepartment, getDepartment } from "./slice"

export const GetAllDepartmentThunks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await DeptGetAll()
        dispatch(getDepartment(response.data))
    } catch (error) {
        console.log(error, "Department thunks")
    }
}

export const CreateDepartmentThunks = (data: DepartmentType) => async (dispatch: AppDispatch) => {
    try {
        await CreateDepartmentService(data)
        dispatch(addAndUpdateDepartment(data))
    } catch (error) {
        console.log(error, "Dept add thunks error")
    }
}