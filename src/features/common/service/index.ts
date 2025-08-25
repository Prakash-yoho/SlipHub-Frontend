import Client from '../../../api/index'

export const GetFormDepartmentService = async () => {
    const response = await Client.common.getdpt()
    return response
}

export const handleDownload = async (data: string) => {
    const response = await Client.payroll.download(data);
    const url = window.URL.createObjectURL(response);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payrollslip-${data}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}