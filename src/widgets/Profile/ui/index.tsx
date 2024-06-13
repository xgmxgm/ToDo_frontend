'use client'

import { Loader } from '@/shared/ui/Loader'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export const Profile = () => {
	const { data: session, status } = useSession()

	if (status == "loading") {
		return(
			<>
				<div className='flex items-center justify-center h-[85vh]'>
					<Loader />
				</div>
			</>
		)
	}

	if (!session) {
		return (
			<>
				<div className='flex items-center justify-center'>
					<h2>Not authenticated</h2>
				</div>
			</>
		)
	}

	if (session) {
		console.log("session", session)

		return (
			<>
				<div className='flex justify-center mt-7'>
					<div className='text-center bg-[#21222B] p-5 rounded-lg border-gray-600 border-2'>
						<div className='flex justify-center items-center mb-4'>
							<div
								className='rounded-full p-4'
								style={{backgroundColor: session.user.colorAvatar}}
							>
								<Image src={"defaultUser.svg"} alt='default user' width={100} height={100} className='m-2' />
							</div>
						</div>
						<div className='leading-7'>
							<h2 className='text-xl mb-1'><span className='text-base text-gray-500'>{session.user.id}. </span>{session?.user?.fullName}</h2>
							<h3>{session?.user?.email}</h3>
							<h3>Tasks: {session.user.Tasks.length}</h3>
						</div>
						{
							session.user.Tasks.map((task, index) => <div key={index} className='bg-slate-800 w-52 flex flex-col justify-center items-center rounded-lg my-3 py-2'>
								<div className='flex justify-between w-9/12'>
									<input type="checkbox" checked={task.isComplete} readOnly />
								</div>
								<h2>description: {task.description}</h2>
								<h2>authorId: {task.authorId}</h2>
							</div>)
						}
					</div>
				</div>
			</>
		)
	}
}