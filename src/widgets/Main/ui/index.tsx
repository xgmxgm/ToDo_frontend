'use client'

import { CreateTaskButton } from '@/shared/ui/CreateTaskButton'
import { useSession } from 'next-auth/react'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Input } from '@/shared/ui/Input'
import { Tasks } from '@/widgets/Tasks'
import { useState } from 'react'
import Image from 'next/image'
import axios from "@/axios"

export const Main = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [taskTitle, setTaskTitle] = useState<string>('');
	
	const { data: session, update } = useSession();

	const handleFetch = async () => {
		const req = {
			title: taskTitle,
			authorId: session?.user.id
		}

		const res = await axios.post("/task/create", req)

		if (res.data) {
			const newSession = {
				...session,
			}

			newSession.user?.Tasks.push(res.data)

			await update(newSession)
			setTaskTitle('')
			setOpenModal(false)
		}
	}

	return (
		<>
			<div>
				<div>
					<Tasks />
					<CreateTaskButton setState={setOpenModal} />
					<Modal state={openModal} setState={setOpenModal}>
						<div>
							<div className='flex justify-between items-center pb-4'>
								<h2 className='text-lg font-semibold'>Create Task</h2>
								<button onClick={() => setOpenModal(false)}><Image src="/cross.svg" alt='icon' width={11} height={11} /></button>
							</div>
							<div className='pb-3'>
								<h2 className='font-semibold pb-2'>Title</h2>
								<Input type='text' placeholder='Enter title for task' setState={setTaskTitle} state={taskTitle} />
							</div>
							<div>
								<Button onClick={() => handleFetch()}>Create Task</Button>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</>
	);
}