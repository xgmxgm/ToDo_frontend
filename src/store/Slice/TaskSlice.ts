import { ITask } from '@/types/next-auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ITask[] = [];

const TaskSlice = createSlice({
	name: "Tasks",
	initialState,
	reducers: {
		setTask(state, action: PayloadAction<ITask[]>) {
			state = action.payload;
			return state
		},
		addTask(state, action: PayloadAction<ITask>) {
			state.push(action.payload)
			console.log("state TaksSlice: ",JSON.parse(JSON.stringify(state)))
			return state
		},
		deleteTask(state, action: PayloadAction<number>) {
			delete state[action.payload]
		}
	}
});

export const { setTask, addTask, deleteTask } = TaskSlice.actions;
export default TaskSlice.reducer;