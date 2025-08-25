import { configureStore } from '@reduxjs/toolkit';
import hrstore from '../features/HrProfile/redux/slice'
import empolyee from '../features/EmployeeProfile/redux/slice'
import common from '../features/common/redux/slice'
import department from '../features/Department/redux/slice'
import payroll from '../features/payroll/redux/slice'

const store = configureStore({
	reducer: {
		hrstore,
		empolyee,
		common,
		department,
		payroll
	},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;