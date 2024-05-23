'use client'

import { useSession } from 'next-auth/react'

export const Profile = () => {
	const { data: session, status } = useSession()

	if (status == "loading") {
		return(
			<>
				<div>
					<h2>LOADING...</h2>
				</div>
			</>
		)
	}

	if (!session) {
		return (
			<>
				<div>
					<h2>Not authenticated</h2>
				</div>
			</>
		)
	}

	if (session) {
		console.log("session", session)

		return (
			<>
				<div>
					<div>
						<h2>Profile page</h2>
						<h3>Id: {session?.user?.id}</h3>
						<h3>Name: {session?.user?.fullName}</h3>
						<h3>Email: {session?.user?.email}</h3>
						<p>Tasks:</p>
						{
							session.user.Tasks.map((task, index) => <div key={index} className='bg-slate-800 w-52 flex flex-col justify-center items-center rounded-lg my-3 py-2'>
								<div className='flex justify-between w-9/12'>
									<p>id: {task.id}</p>
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