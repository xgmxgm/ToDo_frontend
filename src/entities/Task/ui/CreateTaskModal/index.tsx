import { useAddTaskMutation } from '../../queries'
import { type CreateTaskType } from '../../types'
import { useSession } from 'next-auth/react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Modal'
import Image from 'next/image'

export const CreateTaskModal = ({
	showModal,
	setShowModal,
	taskTitle,
	setTaskTitle,
}: CreateTaskType) => {
	const { data: session } = useSession()
	const [addTask] = useAddTaskMutation()

	const handleFetch = async () => {
		const req = {
			title: taskTitle,
			authorId: session?.user.id,
		}

		await addTask(req)
		setTaskTitle('')
		setShowModal(false)
	}

	return (
		<Modal state={showModal} setState={setShowModal}>
			<div
				onKeyDown={e => {
					e.key === 'Enter' && handleFetch()
				}}
			>
				<div className='flex justify-between items-center pb-4'>
					<h2 className='text-lg font-semibold'>Create Task</h2>
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
				<div>
					<Button onClick={() => handleFetch()}>Create</Button>
				</div>
			</div>
		</Modal>
	)
}
