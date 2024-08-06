import { useCompleteSubTaskMutation } from '../../queries'
import { Checkbox } from '@/shared/ui/Checkbox'
import { SubTaskType } from '../../types'
import Image from 'next/image'
import { FC } from 'react'

interface IProps {
	subTask: SubTaskType
	lastRoute: boolean
}

export const SubTaskCard: FC<IProps> = ({ subTask, lastRoute }) => {
	const [completeSubTask] = useCompleteSubTaskMutation()

	const CompleteTaskFetch = async (id: number) => {
		await completeSubTask({ id })
	}

	return (
		<div className='rounded-lg px-3 py-3 flex items-center'>
			<div className='flex justify-between items-center'>
				<div className='mr-3 flex items-center'>
					<div className='mr-2'>
						{lastRoute ? (
							<Image src='/icons/route.png' alt='icon' width={25} height={25} />
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
					<p className='sm:text-sm sm:max-w-[150px] text-wrap max-w-[250px]'>
						{subTask.title}
					</p>
				)}
			</div>
		</div>
	)
}
