import {
	useCompleteSubTaskMutation,
	useDeleteSubTaskMutation,
} from '../../queries'
import { Checkbox } from '@/shared/ui/Checkbox'
import { SubTaskType } from '../../types'
import Image from 'next/image'
import { FC } from 'react'

interface IProps {
	subTask: SubTaskType
}

export const SubTaskCard: FC<IProps> = ({ subTask }) => {
	const [completeSubTask] = useCompleteSubTaskMutation()
	const [deleteSubTask] = useDeleteSubTaskMutation()

	const DeleteTaskFetch = async () => {
		const req = {
			id: subTask.id,
		}

		await deleteSubTask(req)
	}

	const CompleteTaskFetch = async (id: number) => {
		await completeSubTask({ id })
	}

	return (
		<div className='border-2 border-[#5A54D6] rounded-lg px-3 py-3 mt-3 flex items-center justify-between'>
			<div className='flex justify-between items-center max-w-[90%]'>
				<div className='mr-3'>
					<Checkbox
						checked={subTask.isComplete}
						onClick={() => CompleteTaskFetch(subTask.id)}
					/>
				</div>
				{subTask.isComplete ? (
					<p>
						<s>{subTask.title}</s>
					</p>
				) : (
					<p>{subTask.title}</p>
				)}
			</div>
			<div className='flex items-center justify-center ml-3'>
				<button onClick={() => DeleteTaskFetch()}>
					<Image src='/cross.svg' alt='icon' width={11} height={11} />
				</button>
			</div>
		</div>
	)
}
