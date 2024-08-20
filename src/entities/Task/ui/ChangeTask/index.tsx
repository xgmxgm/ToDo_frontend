import {
	useAddSubTaskMutation,
	useDeleteTaskMutation,
	useEditTaskMutation,
} from '../../queries'
import { SubTaskCard } from '../SubTaskCard'
import { useSession } from 'next-auth/react'
import { Button } from '@/shared/ui/Button'
import React, { FC, useState } from 'react'
import { useSwiper } from 'swiper/react'
import { TaskType } from '../../types'
import Image from 'next/image'

interface IProps {
	task: TaskType
}

export const ChangeTask: FC<IProps> = ({ task }) => {
	const [inputValueTitle, setInputValueTitle] = useState<string>(task.title)
	const [addSubtaskModal, setAddSubtaskModal] = useState<boolean>(false)
	const [editTitle, setEditTitle] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const [createSubtask] = useAddSubTaskMutation()
	const [deleteTask] = useDeleteTaskMutation()
	const [editTask] = useEditTaskMutation()
	const { data: session } = useSession()
	const swiper = useSwiper()

	const DeleteTaskFetch = async (id: number) => {
		const req = {
			body: {
				ids: [id],
			},
			token: session?.user.accessToken,
		}

		await deleteTask(req)
	}

	const handleCraeteSubtask = async () => {
		const req = {
			body: {
				taskId: task.id,
				title: inputValue,
			},
			token: session?.user.accessToken,
		}

		await createSubtask(req)
		setAddSubtaskModal(false)
		setInputValue('')
	}

	const handleEditTask = async () => {
		const req = {
			body: {
				id: task.id,
				title: inputValueTitle,
			},
			token: session?.user.accessToken,
		}

		await editTask(req)
		setEditTitle(false)
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
					{!editTitle ? (
						<div className='flex items-center justify-between'>
							<p>{task.title}</p>
							<button onClick={() => setEditTitle(true)}>
								<Image
									src='/icons/edit-pen.svg'
									alt='icon'
									width={17}
									height={17}
								/>
							</button>
						</div>
					) : (
						<div className='flex items-center gap-2'>
							<input
								type='text'
								value={inputValueTitle}
								placeholder='Enter title'
								onChange={e => setInputValueTitle(e.target.value)}
								className='rounded-md font-medium outline-none px-4 py-2 bg-transparent border-[1px] border-[#707088] my-2 transition-all duration-200 focus:bg-slate-100 focus:text-[#707088] w-full'
							/>
							<Button
								onClick={() => handleEditTask()}
								className='w-36 flex items-center justify-center gap-2'
							>
								<Image
									src='icons/check.svg'
									alt='icon'
									width={20}
									height={20}
								/>
								Save
							</Button>
						</div>
					)}
				</div>
				<div>
					<h2 className='font-bold text-lg'>Subtasks</h2>
					{task.subTasks.length ? (
						task.subTasks.map((subTask, index) => (
							<div key={subTask.id}>
								<SubTaskCard
									subTask={subTask}
									lastRoute={index == task.subTasks.length - 1 ? false : true}
									mode='edit'
								/>
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
