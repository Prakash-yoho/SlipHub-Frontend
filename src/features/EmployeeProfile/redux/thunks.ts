import type { AppDispatch } from "../../../store/store"

export const GetAllEmployeeThunks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await HrGetAll()
        dispatch(getHrDetails(response.data))
    } catch (error) {
        console.log(error, "hr thunks")
    }
}
