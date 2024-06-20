'use client'

import { CreateTaskButton } from '@/shared/ui/CreateTaskButton'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '@/store/Slice/TaskSlice'
import { useSession } from 'next-auth/react'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Input } from '@/shared/ui/Input'
import { Tasks } from '@/widgets/Tasks'
import { RootState } from '@/store'
import { useState } from 'react'
import Image from 'next/image'
import axios from "@/axios"

export const Main = () => {
	const [taskDescription, setTaskDescription] = useState<string>('');
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [taskTitle, setTaskTitle] = useState<string>('');
	
	const { data: session } = useSession();

	const dispatch = useDispatch();

	const handleFetch = async () => {
		const req = {
			title: taskTitle,
			description: taskDescription,
			authorId: session?.user.id
		}

		const res = await axios.post("/task/create", req)

		if (res.data) {
			setOpenModal(false)
		}

		dispatch(addTask(res.data))

		console.log(res)
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
							<div className='pb-3'>
								<h2 className='font-semibold pb-2'>Description</h2>
								<Input type='text' placeholder='Enter description for task' setState={setTaskDescription} state={taskDescription} />
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