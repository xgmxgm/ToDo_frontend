'use client'

import { useGetTasksQuery } from '@/entities/Task/queries'
import { ChangeTask, TaskCard } from '@/entities/Task'
import { Swiper, SwiperSlide } from 'swiper/react'
import { skipToken } from '@reduxjs/toolkit/query'
import { TaskType } from '@/entities/Task/types'
import { useSession } from 'next-auth/react'
import { EffectFlip } from 'swiper/modules'
import 'swiper/css/effect-fade'
import 'swiper/css'

export const Tasks = () => {
	const { data: session } = useSession()
	const { data: Tasks = [] } = useGetTasksQuery(
		session?.user.id
			? {
					authorId: session?.user.id,
			  }
			: skipToken
	)

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
							{Tasks.map((task: TaskType) => (
								<SwiperSlide key={task.id}>
									<Swiper
										effect='flip'
										modules={[EffectFlip]}
										allowTouchMove={false}
									>
										<SwiperSlide>
											<div className='flex justify-center items-center'>
												<TaskCard task={task} />
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className='flex justify-center items-center'>
												<ChangeTask task={task} />
											</div>
										</SwiperSlide>
									</Swiper>
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
