'use client';

import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./Slice/TaskSlice";

export const store = configureStore({
	reducer: {
		tasks: taskReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>