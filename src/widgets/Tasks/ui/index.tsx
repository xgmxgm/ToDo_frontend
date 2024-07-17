'use client'

import { useGetTasksQuery } from '@/entities/Task/queries'
import { skipToken } from '@reduxjs/toolkit/query'
import { TaskType } from '@/entities/Task/types'
import { useSession } from 'next-auth/react'
import { TaskCard } from '@/entities/Task'

export const Tasks = () => {
	const { data: session } = useSession()
	const { data: Tasks = [] } = useGetTasksQuery(session?.user.id ?? skipToken)

	return (
		<div>
			<h2 className='text-xl text-center font-bold'>Tasks</h2>
			<div className='flex justify-center w-[97vw] min-h-[81vh]'>
				{Tasks.length ? (
					<div className='flex overflow-x-auto w-full min-h-full'>
						{Tasks.map((task: TaskType, index: number) => (
							<TaskCard key={index} task={task} />
						))}
					</div>
				) : (
					<p className='text-center'>Not tasks</p>
				)}
			</div>
		</div>
	)
}
