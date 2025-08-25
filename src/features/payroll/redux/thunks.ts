import type { AppDispatch } from "../../../store/store";
import type { PayRollType } from "../../../Type/payroll/type";
import { GetEmployeeByUUIDService } from "../../EmployeeProfile/service";
import { GeneratePayrollService, GetPayrollEmpService } from "../service";
import { getPayrollEmp, selectedEmp } from "./slice";

export const GetPayrollEmpThunks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await GetPayrollEmpService()
        dispatch(getPayrollEmp(response.data))
    } catch (error) {
        console.log(error, "payroll thunks")
    }
}

export const PayrollSelectedEmpThunks = (params: string) => async (dispath: AppDispatch) => {
    try {
        const response = await GetEmployeeByUUIDService(params)
        dispath(selectedEmp(response.data))
    } catch (error) {
        console.log(error, "payroll thunks")
    }
}

export const GeneratePayrollThunks = (data: PayRollType) => async (dispath: AppDispatch) => {
    try {
        const response = await GeneratePayrollService(data)
        console.log(response)
    } catch (error) {
        console.log(error, "payroll generate thunks")
    }
}