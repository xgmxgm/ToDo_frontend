import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ITask[] = [];

const TaskSlice = createSlice({
	name: "Task",
	initialState,
	reducers: {
		setTask(state, action: PayloadAction<ITask[]>) {
			state = action.payload;

			console.log(state)

			return state
		}
	}
});

export const { setTask } = TaskSlice.actions;
export default TaskSlice.reducer;