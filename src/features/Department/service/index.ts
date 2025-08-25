import Client from '../../../api/index'
import type { DepartmentType } from '../../../Type/Department/Type'

export const DeptGetAll = async () => {
    const response = await Client.department.getall()
    return response
}

export const CreateDepartmentService = async (data: DepartmentType) => {
    await Client.department.create(data)
}

// export const UpdateHrService = async (data: DepartmentType, params: string) => {
//     await Client.hr.update(data, params)
// }

export const DeleteDepartment = async (data:any)=>{
    await Client.department.delete(data)
}