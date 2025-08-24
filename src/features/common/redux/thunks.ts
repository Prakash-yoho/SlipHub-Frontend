import type { AppDispatch } from "../../../store/store"
import { GetFormDepartmentService } from "../service"
import { getAllDepartment } from "./slice"


export const GetFormDepartmentThunks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await GetFormDepartmentService()
        dispatch(getAllDepartment(response.data))
    } catch (error) {
        console.log(error, "dpt thunks")
    }
}