/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast'
import Client from '../../../api/index'

export const GetFormDepartmentService = async () => {
    const response = await Client.common.getdpt()
    return response
}

export const handleDownload = async (data: string) => {
    const toastId = toast.loading("Preparing your payroll slip...");
    try {
        const response = await Client.payroll.download(data);
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payrollslip-${data}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        toast.success("Slip downloaded successfully!", { id: toastId });
    } catch (error) {
        toast.error("Failed to download slip.", { id: toastId });
    }
}

export const handleDownloadMonth = async (data: any, emp: any) => {
    const toastId = toast.loading("Preparing your payroll slip...");
    try {
        const response = await Client.payroll.downloadMonth(data, emp);
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payrollslip-${data}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        toast.success("Slip downloaded successfully!", { id: toastId });
    } catch (error) {
        toast.error("No slips Found in your Entry.", { id: toastId });
    }
}