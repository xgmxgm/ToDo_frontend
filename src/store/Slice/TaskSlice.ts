import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITask } from '@/types/next-auth'

const initialState: ITask[] = [];

const TaskSlice = createSlice({
	name: "Tasks",
	initialState,
	reducers: {
		setTasks(state, action: PayloadAction<ITask[]>) {
			state = action.payload;
			return state;
		},
		addTask(state, action: PayloadAction<ITask>) {
			state.push(action.payload);
			return state;
		},
		deleteTask(state, action: PayloadAction<number>) {
			return state.filter((_, index) => index !== action.payload);
		},
		completeTask(state, action: PayloadAction<number>) {
			state[action.payload].isComplete = !state[action.payload].isComplete;
			return state;
		}
	},
});

export const { setTasks, addTask, deleteTask, completeTask } = TaskSlice.actions;
export default TaskSlice.reducer;