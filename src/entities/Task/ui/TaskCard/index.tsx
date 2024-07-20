import { CreateSubTaskModal } from '../CreateSubTaskModal'
import { useCompleteTaskMutation } from '../../queries'
import { DeleteButton } from '@/shared/ui/DeleteButton'
import { DeleteTaskModal } from '../DeleteTaskModal'
import { Checkbox } from '@/shared/ui/Checkbox'
import { SubTaskCard } from '../SubTaskCard'
import { Button } from '@/shared/ui/Button'
import { TaskType } from '../../types'
import { FC, useState } from 'react'

interface IProps {
	task: TaskType
}

export const TaskCard: FC<IProps> = ({ task }) => {
	const [openSubTaskModal, setOpenSubTaskModal] = useState<boolean>(false)
	const [subTaskTitle, setSubTaskTitle] = useState<string>('')
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [completeTask] = useCompleteTaskMutation()

	const CompleteTaskFetch = async (id: number) => {
		await completeTask({ id })
	}

	return (
		<div className='mx-3'>
			<div className='w-[400px] border-2 border-[#21222B] rounded-lg p-4 mt-6 mb-3 flex items-center justify-between'>
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
				<Button onClick={() => setOpenSubTaskModal(true)}>
					Add Sub Task +
				</Button>
			</div>
			<CreateSubTaskModal
				taskId={task.id}
				subTaskTitle={subTaskTitle}
				setSubTaskTitle={setSubTaskTitle}
				showModal={openSubTaskModal}
				setShowModal={setOpenSubTaskModal}
			/>
		</div>
	)
}
