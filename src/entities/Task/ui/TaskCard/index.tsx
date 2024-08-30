import { useCompleteTaskMutation } from '../../queries'
import { Checkbox } from '@/shared/ui/Checkbox'
import { useSession } from 'next-auth/react'
import { SubTaskCard } from '../SubTaskCard'
import { useSwiper } from 'swiper/react'
import { TaskType } from '../../types'
import Image from 'next/image'
import { FC } from 'react'

interface IProps {
	task: TaskType
}

export const TaskCard: FC<IProps> = ({ task }) => {
	const [completeTask] = useCompleteTaskMutation()
	const { data: session } = useSession()
	const swiper = useSwiper()

	const CompleteTaskFetch = async (id: number) => {
		await completeTask({ body: { id } })
	}

	return (
		<div className='sm:w-[300px] w-[400px]'>
			<div className='border-2 border-[#21222B] rounded-lg p-4 mt-6 flex items-center justify-between'>
				<div className='flex justify-between items-center max-w-[90%]'>
					<div className='mr-3 flex items-center'>
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
					<button onClick={() => swiper.slideNext()}>
						<Image src='/icons/edit.svg' alt='icon' width={22} height={22} />
					</button>
				</div>
			</div>
			{task.subTasks.map((subTask, index) => (
				<SubTaskCard
					mode='view'
					key={subTask.id}
					subTask={subTask}
					lastRoute={index == task.subTasks.length - 1 ? false : true}
				/>
			))}
		</div>
	)
}
