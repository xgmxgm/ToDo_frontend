'use client'

import { useGetTasksQuery } from '@/entities/Task/queries'
import { Swiper, SwiperSlide } from 'swiper/react'
import { skipToken } from '@reduxjs/toolkit/query'
import { TaskType } from '@/entities/Task/types'
import { useSession } from 'next-auth/react'
import { TaskCard } from '@/entities/Task'
import 'swiper/css'

export const Tasks = () => {
	const { data: session } = useSession()
	const { data: Tasks = [] } = useGetTasksQuery(session?.user.id ?? skipToken)

	return (
		<div>
			<h2 className='text-xl text-center font-bold'>Tasks</h2>
			<div className='w-[97vw] flex justify-center items-center'>
				{Tasks.length ? (
					<div className='w-full min-h-full'>
						<Swiper
							slidesPerView='auto'
							breakpoints={{
								0: { slidesPerView: 1 },
								870: { slidesPerView: 2 },
								1300: { slidesPerView: 3 },
							}}
						>
							{Tasks.map((task: TaskType, index: number) => (
								<SwiperSlide key={index}>
									<div className='flex justify-center items-center'>
										<TaskCard key={index} task={task} />
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<p className='text-center'>Not tasks</p>
				)}
			</div>
		</div>
	)
}
