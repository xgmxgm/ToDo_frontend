import { useAddTaskMutation } from '../../queries'
import { type CreateTaskType } from '../../types'
import { CreateSubTask } from '../CreateSubTask'
import { useSession } from 'next-auth/react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Modal'
import { useState } from 'react'
import Image from 'next/image'

export const CreateTaskModal = ({
	showModal,
	setShowModal,
	taskTitle,
	setTaskTitle,
}: CreateTaskType) => {
	const [subtasks, setSubtasks] = useState<{ title: string }[]>([])
	const { data: session } = useSession()
	const [addTask] = useAddTaskMutation()

	const handleFetch = async () => {
		const req = {
			body: {
				title: taskTitle,
				authorId: session?.user.id,
				subtasks,
			},
			token: session?.user.accessToken,
		}

		await addTask(req)
		setTaskTitle('')
		setShowModal(false)
		setSubtasks([])
	}

	return (
		<Modal state={showModal} setState={setShowModal}>
			<div
				onKeyDown={e => {
					e.key === 'Enter' && handleFetch()
				}}
				className='w-[300px]'
			>
				<div className='flex justify-between items-center pb-4'>
					<h2 className='text-lg font-semibold'>Create New Task</h2>
					<button onClick={() => setShowModal(false)}>
						<Image src='/cross.svg' alt='icon' width={11} height={11} />
					</button>
				</div>
				<div className='pb-3'>
					<h2 className='font-semibold pb-2'>Title</h2>
					<Input
						type='text'
						placeholder='Enter title for task'
						setState={setTaskTitle}
						state={taskTitle}
					/>
				</div>
				<div className='pb-3'>
					<h2 className='font-semibold pb-2'>Subtasks</h2>
					<CreateSubTask subtasks={subtasks} setSubtasks={setSubtasks} />
				</div>
				<div>
					<Button onClick={() => handleFetch()} className='mt-1'>
						Create Task
					</Button>
				</div>
			</div>
		</Modal>
	)
}
