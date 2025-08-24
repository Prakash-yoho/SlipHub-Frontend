import Client from '../../../api/index'
import type { EmployeeProfile } from '../../../Type/Emp_profile/Type'

export const GetAllEmployeeService = async () => {
    const response = await Client.employee.getall()
    return response
}

export const CreateEmployeeService = async (data: EmployeeProfile) => {
    await Client.employee.create(data)
}