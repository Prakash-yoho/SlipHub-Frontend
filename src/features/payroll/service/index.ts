import Client from '../../../api/index'
import type { PayRollType } from '../../../Type/payroll/type'

export const GetPayrollEmpService = async () => {
    const response = await Client.payroll.getemp()
    return response
}

export const GeneratePayrollService = async (data: PayRollType) => {
    const response = await Client.payroll.create(data)
    return response
}