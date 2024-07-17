import { useDeleteTaskMutation } from '../../queries'
import { type DeleteTaskType } from '../../types'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import Image from 'next/image'

export const DeleteTaskModal = ({
	id,
	showModal,
	setShowModal,
}: DeleteTaskType) => {
	const [deleteTask, {}] = useDeleteTaskMutation()

	const DeleteTaskFetch = async () => {
		const req = {
			ids: [id],
		}

		await deleteTask(req)
		setShowModal(false)
	}

	return (
		<Modal state={showModal} setState={setShowModal}>
			<div>
				<div className='flex justify-between items-center pb-4'>
					<h2 className='text-lg font-semibold'>Delete Task</h2>
					<button onClick={() => setShowModal(false)}>
						<Image src='/cross.svg' alt='icon' width={11} height={11} />
					</button>
				</div>
				<div className='pb-3'>
					<h2 className='font-semibold pb-2'>Do you want delete task</h2>
				</div>
				<div>
					<Button onClick={() => DeleteTaskFetch()}>Delete</Button>
				</div>
			</div>
		</Modal>
	)
}
