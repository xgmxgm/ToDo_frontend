'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { DeleteButton } from '@/shared/ui/DeleteButton'
import { setTask } from '@/store/Slice/TaskSlice'
import { Checkbox } from '@/shared/ui/Checkbox'
import { AddTask } from '@/widgets/AddTask'
import { RootState } from '@/store'
import axios from '@/axios'

export const Main = () => {
	const Tasks = useSelector((state: RootState) => state.task);

	const dispatch = useDispatch();

	const FetchTasks = async () => {
		console.log("fetch")
		const res = await axios.get('/get-tasks')
		dispatch(setTask(res.data))
	};

	useEffect(() => {
		FetchTasks();

		const intervalId = setInterval(FetchTasks, 500);

		return () => clearInterval(intervalId);
	}, [])

	const deleteTask = async (id: number) => {
		await axios.post('/delete', {ids: [id]});
	};

	return (
		<>
			<div className='w-full flex items-center py-3 border-b-[1px] border-black'>
				<h2 className='text-xl text-black font-semibold ml-8'>To Do App <span className='text-red-500'>by XGM</span></h2>
			</div>
			<div className='my-5'>
				<AddTask />
			</div>
			<div>
				{
					Tasks.map((task, index) => 
					<div className='flex items-center justify-between my-8 py-2 px-4 rounded-lg max-w-lg' key={index}>
						<Checkbox />
						<p className='text-[19pt] text-neutral-700'>{task.description}</p>
						<DeleteButton onClick={() => deleteTask(task.id)} />
					</div>)
				}
			</div>
		</>
	);
}