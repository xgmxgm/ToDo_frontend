'use client'

import { DeleteButton } from '@/shared/ui/DeleteButton'
import { Checkbox } from '@/shared/ui/Checkbox'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import axios from "@/axios"

export const Tasks = () => {
	const { data: session, update } = useSession();

	const CompleteTaskFetch = async (id: number, index: number) => {
		const res = await axios.post("/task/complete", { id });

		if (res.data) {
			const newSession = {
				...session,
			}

			newSession.user?.Tasks.map((task, i) => i === index ? task.isComplete = !task.isComplete : null)
			await update(newSession)
		}
		
	}

	useEffect(() => {
		console.log(session)
	})

	return (
		<>
			<div>
				<h2 className='text-lg text-center'>Tasks</h2>
				{
					session ? session.user.Tasks.map((task, index) => 
					<div
						key={index}
						className='min-w-60 border-2 border-[#21222B] rounded-lg px-5 py-4 my-5 flex items-center justify-between'
					>
						<div>
							<div className='flex items-center mb-2'>
								<Checkbox checked={task.isComplete} onClick={() => CompleteTaskFetch(task.id, index)}/>
								<p className='text-lg font-semibold'>{task.title}</p>
							</div>
						</div>
						<div className='flex items-center justify-center ml-3'>
							<DeleteButton id={task.id} index={index} />
						</div>
					</div>) : <p>Not tasks</p>
				}
			</div>
		</>
	)
}