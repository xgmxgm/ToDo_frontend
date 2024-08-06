import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {title: string}[] = []

const SubtaskSlice = createSlice({
	name: 'Tasks',
	initialState,
	reducers: {
		setCurrentsubtask: (state, { payload }: PayloadAction<{title: string}[]>) => {
			state = payload
		}
	},
})

export const { setCurrentsubtask } = SubtaskSlice.actions
export default SubtaskSlice.reducer
