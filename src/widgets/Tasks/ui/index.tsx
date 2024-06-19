import { Checkbox } from '@/shared/ui/Checkbox'
import { DeleteButton } from '@/shared/ui/DeleteButton'
import { RootState } from '@/store'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'

export const Tasks = () => {
	// const { data: session } = useSession();
	const UserTasks = useSelector((state: RootState) => state.tasks);

	return (
		<>
			<div>
				<h2 className='text-lg text-center'>Tasks</h2>
				{
					UserTasks.map((task, index) => 
					<div
						key={index}
						className='min-w-60 border-2 border-[#21222B] rounded-lg px-5 py-4 my-5 flex items-center justify-between'
					>
						<div>
							<div className='flex items-center mb-2'>
								<Checkbox />
								<p className='text-lg font-semibold'>{task.title}</p>
							</div>
							<div>
								<p className='text-lg'>{task.description}</p>
							</div>
						</div>
						<div className='flex items-center justify-center ml-3'>
							<DeleteButton id={task.id} index={index} />
						</div>
					</div>)
				}
			</div>
		</>
	)
}