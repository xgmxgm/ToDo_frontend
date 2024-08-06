import {
	useAddSubTaskMutation,
	useDeleteSubTaskMutation,
	useDeleteTaskMutation,
} from '../../queries'
import { SubTaskCard } from '../SubTaskCard'
import { useSwiper } from 'swiper/react'
import { TaskType } from '../../types'
import React, { FC, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button'

interface IProps {
	task: TaskType
}

export const ChangeTask: FC<IProps> = ({ task }) => {
	const [addSubtaskModal, setAddSubtaskModal] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const [deleteSubTask] = useDeleteSubTaskMutation()
	const [deleteTask] = useDeleteTaskMutation()
	const [createSubtask] = useAddSubTaskMutation()
	const swiper = useSwiper()

	const DeleteSubtaskFetch = async (id: number) => {
		const req = {
			id,
		}

		await deleteSubTask(req)
	}

	const DeleteTaskFetch = async (id: number) => {
		const req = {
			ids: [id],
		}

		await deleteTask(req)
	}

	const handleCraeteSubtask = async () => {
		const req = {
			taskId: task.id,
			title: inputValue,
		}

		await createSubtask(req)
		setAddSubtaskModal(false)
		setInputValue('')
	}

	return (
		<div className='sm:w-[300px] w-[400px] cursor-pointer'>
			<div className='border-2 border-[#21222B] rounded-lg p-4 mt-6 flex flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<p className='font-bold text-xl'>Edit Task</p>
					<button onClick={() => swiper.slidePrev()}>
						<Image src='/cross.svg' alt='icon' width={11} height={11} />
					</button>
				</div>
				<div>
					<h2 className='font-bold text-lg'>Title</h2>
					<p>{task.title}</p>
				</div>
				<div>
					<h2 className='font-bold text-lg'>Subtasks</h2>
					{task.subTasks.length ? (
						task.subTasks.map((subTask, index) => (
							<div
								className='flex items-center justify-between'
								key={subTask.id}
							>
								<SubTaskCard
									subTask={subTask}
									lastRoute={index == task.subTasks.length - 1 ? false : true}
								/>
								<div className='flex items-center justify-center'>
									<button onClick={() => DeleteSubtaskFetch(subTask.id)}>
										<Image src='/cross.svg' alt='icon' width={11} height={11} />
									</button>
								</div>
							</div>
						))
					) : (
						<div className='text-center my-1'>
							<p className='font-semibold'>None Subtasks</p>
						</div>
					)}
					<div>
						{addSubtaskModal ? (
							<div>
								<div>
									<input
										type='text'
										value={inputValue}
										placeholder='Enter title for subtask'
										onChange={e => setInputValue(e.target.value)}
										className='rounded-md font-medium outline-none px-4 py-2 bg-transparent border-[1px] border-[#707088] my-2 transition-all duration-200 focus:bg-slate-100 focus:text-[#707088] w-full'
									/>
								</div>
								<div className='flex items-center justify-between gap-2'>
									<Button
										onClick={() => handleCraeteSubtask()}
										className=' hover:text-[#5A54D6] hover:bg-white border-white py-[6px]'
									>
										Add
									</Button>
									<Button
										onClick={() => setAddSubtaskModal(false)}
										className='py-[6px]'
									>
										Cancel
									</Button>
								</div>
							</div>
						) : (
							<Button
								onClick={() => setAddSubtaskModal(true)}
								className='hover:text-[#5A54D6] hover:bg-white border-white py-[6px] mt-2'
							>
								+ Add Subtask
							</Button>
						)}
					</div>
				</div>
				<div>
					<h2 className='font-bold text-lg'>Delete Task</h2>
					<Button
						onClick={() => DeleteTaskFetch(task.id)}
						className='border-red-500 hover:bg-red-500 mt-2'
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}
