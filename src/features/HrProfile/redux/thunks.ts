import toast from "react-hot-toast"
import type { AppDispatch } from "../../../store/store"
import type { HrProfileType } from "../../../Type/HrProfiles/Type"
import { CreateHrService, GetHrByUUIDservice, HrGetAll, UpdateHrService } from "../service"
import { addAndUpdateHrProfile, clearHr, getHrDetails, getOneHr } from "./slice"

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
        toast.success("Hr Added Successfully")
    } catch (error) {
        console.log(error, "hr add thunks error")
    }
}

export const UpdateHrThunks = (data: HrProfileType, params: string) => async (dispatch: AppDispatch) => {
    try {
        await UpdateHrService(data, params)
        dispatch(addAndUpdateHrProfile(data))
        toast.success("Hr Updated Successfully")
    } catch (error) {
        console.log(error, "hr add thunks error")
    }
}

export const GetHrUUIDThunks = (params: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await GetHrByUUIDservice(params)
        dispatch(getOneHr(response.data))
    } catch (error) {
        console.log(error, "hr get ")
    }
}

export const ClearHrThunks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(clearHr())
    } catch (error) {
        console.log(error, "hr get ")
    }
}