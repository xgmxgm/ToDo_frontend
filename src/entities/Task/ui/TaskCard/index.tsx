import { useAddSubTaskMutation, useCompleteTaskMutation } from '../../queries'
import { DeleteButton } from '@/shared/ui/DeleteButton'
import { DeleteTaskModal } from '../DeleteTaskModal'
import { Checkbox } from '@/shared/ui/Checkbox'
import { SubTaskCard } from '../SubTaskCard'
import { Button } from '@/shared/ui/Button'
import { TaskType } from '../../types'
import { FC, useState } from 'react'
import { Input } from '@/shared/ui/Input'

interface IProps {
	task: TaskType
}

export const TaskCard: FC<IProps> = ({ task }) => {
	const [openSubTaskModal, setOpenSubTaskModal] = useState<boolean>(false)
	const [subTaskTitle, setSubTaskTitle] = useState<string>('')
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [completeTask] = useCompleteTaskMutation()
	const [addSubTask] = useAddSubTaskMutation()

	const CompleteTaskFetch = async (id: number) => {
		await completeTask({ id })
	}

	const handleFetch = async () => {
		const req = {
			title: subTaskTitle,
			taskId: task.id,
		}

		await addSubTask(req)
		setSubTaskTitle('')
		setOpenSubTaskModal(false)
	}

	return (
		<div className='sm:w-[300px] w-[400px]'>
			<div className='border-2 border-[#21222B] rounded-lg p-4 mt-6 mb-3 flex items-center justify-between'>
				<div className='flex justify-between items-center max-w-[90%]'>
					<div className='mr-3'>
						<Checkbox
							checked={task.isComplete}
							onClick={() => CompleteTaskFetch(task.id)}
						/>
					</div>
					{task.isComplete ? (
						<p>
							<s>{task.title}</s>
						</p>
					) : (
						<p>{task.title}</p>
					)}
				</div>
				<div className='flex items-center justify-center'>
					<DeleteButton setState={setOpenModal} />
					<DeleteTaskModal
						id={task.id}
						showModal={openModal}
						setShowModal={setOpenModal}
					/>
				</div>
			</div>
			{task.subTasks.map((subTask, index) => (
				<SubTaskCard key={index} subTask={subTask} />
			))}
			<div className='text-center'>
				{!openSubTaskModal ? (
					<Button onClick={() => setOpenSubTaskModal(true)}>
						Add Sub Task +
					</Button>
				) : (
					<div>
						<div>
							<Input
								type='text'
								placeholder='Enter title for sub task'
								setState={setSubTaskTitle}
								state={subTaskTitle}
							/>
						</div>
						<div className='flex justify-between items-center gap-3'>
							<Button onClick={() => handleFetch()}>Create</Button>
							<Button onClick={() => setOpenSubTaskModal(false)}>Close</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
