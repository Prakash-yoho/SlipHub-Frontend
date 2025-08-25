import Client from '../../../api/index'
import type { HrProfileType } from '../../../Type/HrProfiles/Type'

export const HrGetAll = async () => {
    const response = await Client.hr.getall()
    return response
}

export const CreateHrService = async (data: HrProfileType) => {
    await Client.hr.create(data)
}

export const UpdateHrService = async (data: HrProfileType, params: string) => {
    await Client.hr.update(data, params)
}

export const GetHrByUUIDservice = async (params: string) => {
    const response = await Client.hr.getOne(params)
    return response
}