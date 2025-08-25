import type { AppDispatch } from "../../../store/store"
import type { EmployeeProfile } from "../../../Type/Emp_profile/Type"
import { CreateEmployeeService, GetAllEmployeeService, GetEmployeeByUUIDService } from "../service"
import { addAndUpdateEmployee, getAllemployee, getOneemployee } from "./slice"

export const GetAllEmployeeThunks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await GetAllEmployeeService()
        dispatch(getAllemployee(response.data))
    } catch (error) {
        console.log(error, "employee thunks")
    }
}

export const CreateEmployeeThunks = (data: EmployeeProfile) => async (dispatch: AppDispatch) => {
    try {
        await CreateEmployeeService(data)
        dispatch(addAndUpdateEmployee(data))
    } catch (error) {
        console.log(error, "employee thunks")
    }
}

export const getOneemployeeThunks = (params: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await GetEmployeeByUUIDService(params)
        dispatch(getOneemployee(response.data))
    } catch (error) {
        console.log(error, "employee thunks")
    }
}