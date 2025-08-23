import { configureStore } from '@reduxjs/toolkit';
import hrstore from '../features/HrProfile/redux/slice'
import empolyee from '../features/EmployeeProfile/redux/slice'

const store = configureStore({
	reducer: {
		hrstore,
		empolyee
	},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;