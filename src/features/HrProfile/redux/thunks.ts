import type { AppDispatch } from "../../../store/store"
import type { HrProfileType } from "../../../Type/HrProfiles/Type"
import { CreateHrService, HrGetAll } from "../service"
import { addAndUpdateHrProfile, getHrDetails } from "./slice"

export const GetAllHrThunks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await HrGetAll()
        dispatch(getHrDetails(response.data))
    } catch (error) {
        console.log(error, "hr thunks")
    }
}

export const CreateHrThunks = (data: HrProfileType) => async (dispatch: AppDispatch) => {
    try {
        await CreateHrService(data)
        dispatch(addAndUpdateHrProfile(data))
    } catch (error) {
        console.log(error, "hr add thunks error")
    }
}