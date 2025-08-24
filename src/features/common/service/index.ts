import Client from '../../../api/index'

export const GetFormDepartmentService = async () => {
    const response = await Client.common.getdpt()
    return response
}