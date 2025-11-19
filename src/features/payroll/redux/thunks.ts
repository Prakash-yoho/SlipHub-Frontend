import toast from "react-hot-toast";
import type { AppDispatch } from "../../../store/store";
import type { PayRollType } from "../../../Type/payroll/type";
import { GetEmployeeByUUIDService } from "../../EmployeeProfile/service";
import { GeneratePayrollService, GetPayrollEmpService, handleDeleteSlip } from "../service";
import { deleteSlip, getPayrollEmp, selectedEmp, updatePayslip } from "./slice";

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
        dispath(updatePayslip(response.data))
    } catch (error) {
        console.log(error, "payroll generate thunks")
    }
}

// export const deletePaySlips=(data:string)=>async(dispatch:AppDispatch)=>{
//     try {
//         const res = await handleDeleteSlip(data)
//         dispatch(deleteSlip(res.data))
//     } catch (error:any) {
//         toast.error(error)
//     }
// }

export const deletePaySlips = (uuid: string) => async (dispatch: AppDispatch) => {
  try {
    await handleDeleteSlip(uuid);
    dispatch(deleteSlip(uuid));
    toast.success("Payslip deleted successfully");
  } catch (error: any) {
    toast.error(error?.message || "Failed to delete payslip");
  }
};
