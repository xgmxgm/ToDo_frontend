import {
	useCompleteSubTaskMutation,
	useDeleteSubTaskMutation,
	useEditSubTaskMutation,
} from '../../queries'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Button } from '@/shared/ui/Button'
import { SubTaskType } from '../../types'
import { FC, useState } from 'react'
import Image from 'next/image'

interface IProps {
	mode: 'edit' | 'view'
	subTask: SubTaskType
	lastRoute: boolean
}

export const SubTaskCard: FC<IProps> = ({
	mode = 'view',
	lastRoute,
	subTask,
}) => {
	const [inputValue, setInputValue] = useState<string>(subTask.title)
	const [editTitle, setEditTitle] = useState<boolean>(false)
	const [completeSubTask] = useCompleteSubTaskMutation()
	const [deleteSubTask] = useDeleteSubTaskMutation()
	const [editSubtask] = useEditSubTaskMutation()

	const CompleteTaskFetch = async (id: number) => {
		await completeSubTask({ body: { id } })
	}

	const DeleteSubtaskFetch = async (id: number) => {
		const req = {
			body: {
				id,
			},
		}

		await deleteSubTask(req)
	}

	const handleEditSubtask = async () => {
		const req = {
			body: {
				id: subTask.id,
				title: inputValue,
			},
		}

		await editSubtask(req)
		setEditTitle(false)
	}

	return (
		<div className='rounded-lg px-3 py-3 w-full'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center'>
					<div className='mr-3 flex items-center'>
						<div className='mr-2'>
							{lastRoute ? (
								<Image
									src='/icons/route.png'
									alt='icon'
									width={25}
									height={25}
								/>
							) : (
								<Image
									src='/icons/route-start.svg'
									alt='icon'
									width={25}
									height={25}
									style={{ rotate: '-90deg' }}
								/>
							)}
						</div>
						{mode == 'view' && (
							<Checkbox
								checked={subTask.isComplete}
								onClick={() => CompleteTaskFetch(subTask.id)}
							/>
						)}
					</div>
					<div>
						{subTask.isComplete ? (
							<p className='sm:text-sm sm:max-w-[150px] text-wrap max-w-[200px]'>
								<s>{subTask.title}</s>
							</p>
						) : (
							<div>
								{editTitle ? (
									<div>
										<input
											type='text'
											value={inputValue}
											placeholder='Enter title for subtask'
											onChange={e => setInputValue(e.target.value)}
											className='rounded-md font-medium outline-none px-4 py-2 bg-transparent border-[1px] border-[#707088] my-2 transition-all duration-200 focus:bg-slate-100 focus:text-[#707088] w-full'
										/>
									</div>
								) : (
									<p className='sm:text-sm sm:max-w-[150px] text-wrap max-w-[200px]'>
										{subTask.title}
									</p>
								)}
							</div>
						)}
					</div>
				</div>
				{mode == 'edit' && (
					<div>
						{editTitle ? (
							<div>
								<Button
									onClick={() => handleEditSubtask()}
									className=' flex items-center justify-center rounded-full ml-2 p-[5px]'
								>
									<Image
										src='icons/check.svg'
										alt='icon'
										width={17}
										height={17}
									/>
								</Button>
							</div>
						) : (
							<div className='flex items-center justify-center gap-2'>
								<button onClick={() => setEditTitle(true)}>
									<Image
										src='/icons/edit-pen.svg'
										alt='icon'
										width={17}
										height={17}
									/>
								</button>
								<button onClick={() => DeleteSubtaskFetch(subTask.id)}>
									<Image src='/cross.svg' alt='icon' width={11} height={11} />
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
