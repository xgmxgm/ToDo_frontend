'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setTask } from '@/store/Slice/TaskSlice'
import { AddTask } from '@/widgets/AddTask'
import { RootState } from '@/store'
import { useEffect } from 'react'
import axios from '@/axios'
import { DeleteButton } from '@/shared/ui/DeleteButton'

export const Main = () => {
	const Tasks = useSelector((state: RootState) => state.task);

	const dispatch = useDispatch();

	const FetchTasks = async () => {
		console.log("fetch")
		const res = await axios.get('/get-tasks')
		dispatch(setTask(res.data))
	};

	// useEffect(() => {
	// 	FetchTasks();
	// }, []);

	useEffect(() => {
		FetchTasks();

		const intervalId = setInterval(FetchTasks, 1000);

		return () => clearInterval(intervalId);
	}, [])

	const deleteTask = async (id: number) => {
		await axios.post('/delete', {ids: [id]});
	};

	return (
		<>
			<div className='bg-slate-600 w-full flex items-center justify-center'>
				<h2 className='text-xl'>Main page</h2>
			</div>
			<div className='my-5'>
				<AddTask />
			</div>
			<div>
				{
					Tasks.map((task, index) => 
					<div className='flex items-center justify-between m-2 py-1 px-2 border-2 border-blue-500 border-solid rounded-lg' key={index}>
						<input className='mr-3 scale-125' type="checkbox" />
						<p className='text-[13pt] text-neutral-700'>{task.description}</p>
						{/* <button onClick={() => deleteTask(task.id)}>delete</button> */}
						<DeleteButton onClick={() => deleteTask(task.id)}>delete</DeleteButton>
					</div>)
				}
			</div>
		</>
	);
}