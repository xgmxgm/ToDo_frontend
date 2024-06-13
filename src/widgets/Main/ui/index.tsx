'use client'

import { CreateTaskButton } from '@/shared/ui/CreateTaskButton'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Modal'
import { useState } from 'react'

export const Main = () => {
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [taskTitle, setTaskTitle] = useState<string>('')

	return (
		<>
			<div>
				<div>
					<p>Main page</p>
					<CreateTaskButton setState={setOpenModal} />
					{openModal && <Modal setState={setOpenModal}>
						<p>Create Task</p>
						<Input type='text' placeholder='Enter title for task' setState={setTaskTitle} state={taskTitle} />
						<Input type='text' placeholder='Enter description for task' setState={setTaskTitle} state={taskTitle} />
					</Modal>}
				</div>
			</div>
		</>
	);
}