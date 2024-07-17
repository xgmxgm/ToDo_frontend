'use client'

import { CreateButton } from '@/shared/ui/CreateButton'
import { CreateTaskModal } from '@/entities/Task'
import { Tasks } from '@/widgets/Tasks'
import { useState } from 'react'

export default function Home() {
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [taskTitle, setTaskTitle] = useState<string>('')

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
