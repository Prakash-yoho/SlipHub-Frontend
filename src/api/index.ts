/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from './httpclient';
import { API_ENDPOINTS } from './endpoints';
import type { HrProfileType } from '../Type/HrProfiles/Type';
import type { EmployeeProfile } from '../Type/Emp_profile/Type';

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
		getall: () => httpClient.get(API_ENDPOINTS.hr.getAll),
		// getOne:(params:string)=>httpClient.get(API_ENDPOINTS.hr.)
		create: (data: HrProfileType) => httpClient.post(API_ENDPOINTS.hr.create, data),
		update: (data: HrProfileType, params: string) => httpClient.put(API_ENDPOINTS.hr.update.replace(":uuid", params), data),
		delete: (params: string) => httpClient.delete(API_ENDPOINTS.hr.delete.replace(":uuid", params))
	};

	department = {
		getall: () => httpClient.get(API_ENDPOINTS.department.getAll),
		create: (data:any) => httpClient.post(API_ENDPOINTS.department.create, data),
	}
	employee = {
		getall: () => httpClient.get(API_ENDPOINTS.employee.getAll),
		create: (data: EmployeeProfile) => httpClient.post(API_ENDPOINTS.employee.create, data),
	}
	common = {
		getdpt: () => httpClient.get(API_ENDPOINTS.common.getdpt)
	}
}
export default new Client();
