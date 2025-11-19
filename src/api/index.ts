/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from './httpclient';
import { API_ENDPOINTS } from './endpoints';
import type { HrProfileType } from '../Type/HrProfiles/Type';
import type { EmployeeProfile } from '../Type/Emp_profile/Type';
import { GetLocalStorage } from '../utils/localstorage';

function getid() {
	const data: any = GetLocalStorage("company")
	return data ?? ""
}
class Client {
	auth = {
		login: (data: any) =>
			httpClient.post(API_ENDPOINTS.auth.login, data),
		verify_otp: (data: any) =>
			httpClient.post(API_ENDPOINTS.auth.verify_otp, data),
		register: (data: any) =>
			httpClient.post(API_ENDPOINTS.auth.register, data),
	};
	hr = {
		getall: () => httpClient.get(API_ENDPOINTS.hr.getAll.replace(":companyid", getid())),
		getOne: (params: string) => httpClient.get(API_ENDPOINTS.hr.getone.replace(":uuid", params).replace(":companyid", getid())),
		create: (data: HrProfileType) => httpClient.post(API_ENDPOINTS.hr.create.replace(":companyid", getid()), data),
		update: (data: HrProfileType, params: string) => httpClient.put(API_ENDPOINTS.hr.update.replace(":uuid", params).replace(":companyid", getid()), data),
		delete: (params: string) => httpClient.delete(API_ENDPOINTS.hr.delete.replace(":uuid", params).replace(":companyid", getid()))
	};

	department = {
		getall: () => httpClient.get(API_ENDPOINTS.department.getAll.replace(":companyid", getid())),
		create: (data: any) => httpClient.post(API_ENDPOINTS.department.create.replace(":companyid", getid()), data),
		delete: (params: string) => httpClient.delete(API_ENDPOINTS.department.delete.replace(":uuid", params).replace(":companyid", getid()))
	}
	employee = {
		getall: () => httpClient.get(API_ENDPOINTS.employee.getAll.replace(":companyid", getid())),
		create: (data: EmployeeProfile) => httpClient.post(API_ENDPOINTS.employee.create.replace(":companyid", getid()), data),
		getone: (params: string) => httpClient.get(API_ENDPOINTS.employee.getById.replace(":uuid", params).replace(":companyid", getid())),
		update: (data: EmployeeProfile, params: string) => httpClient.put(API_ENDPOINTS.employee.update.replace(":uuid", params).replace(":companyid", getid()), data)
	}
	common = {
		getdpt: () => httpClient.get(API_ENDPOINTS.common.getdpt.replace(":companyid", getid())),
		dashboard: (params: string) => httpClient.get(API_ENDPOINTS.common.dashboad.replace(":companyid", params))
	}
	payroll = {
		create: (data: any) => httpClient.post(API_ENDPOINTS.payroll.create.replace(":companyid", getid()), data),
		getemp: () => httpClient.get(API_ENDPOINTS.payroll.getemp.replace(":companyid", getid())),
		download: (params: string) => httpClient.getfile(API_ENDPOINTS.payroll.download.replace(":uuid", params).replace(":companyid", getid())),
		downloadMonth: (params: any, emp: any) => httpClient.getfile(API_ENDPOINTS.payroll.downloadMonth.replace(":date", params).replace(":companyid", getid()).replace(":employee", emp)),
		deletepaySlip:(params:string)=>httpClient.delete(API_ENDPOINTS.payroll.deleteSlip.replace(":uuid", params).replace(":companyid", getid()))
	}
}
export default new Client();
