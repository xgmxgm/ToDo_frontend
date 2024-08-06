'use client'

import { CreateButton } from '@/shared/ui/CreateButton'
import { CreateTaskModal } from '@/entities/Task'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tasks } from '@/widgets/Tasks'

export default function Home() {
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [taskTitle, setTaskTitle] = useState<string>('')
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (!session && status == 'unauthenticated') {
			router.push('/signin')
		}
	})

	return (
		<div className='flex flex-col items-center w-full'>
			<Tasks />
			<CreateButton setState={setOpenModal} />
			<CreateTaskModal
				showModal={openModal}
				setShowModal={setOpenModal}
				taskTitle={taskTitle}
				setTaskTitle={setTaskTitle}
			/>
		</div>
	)
}
