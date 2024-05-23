import { ITask } from '@/types/next-auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ITask[] = [];

const TaskSlice = createSlice({
	name: "Task",
	initialState,
	reducers: {
		setTask(state, action: PayloadAction<ITask[]>) {
			state = action.payload;
			return state
		}
	}
});

export const { setTask } = TaskSlice.actions;
export default TaskSlice.reducer;