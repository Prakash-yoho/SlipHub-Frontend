import Client from '../../../api/index'
import type { HrProfileType } from '../../../Type/HrProfiles/Type'

export const HrGetAll = async () => {
    const response = await Client.hr.getall()
    return response
}
