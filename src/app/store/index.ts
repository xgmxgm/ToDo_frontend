import { configureStore } from '@reduxjs/toolkit'
import subTaskReducer from '../../entities/Task/slice'
import { rtkApi } from '@/shared/libs/api/init'

export const store = configureStore({
	reducer: {
		subtasks: subTaskReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(rtkApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
