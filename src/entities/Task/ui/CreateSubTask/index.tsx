import React from 'react'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

interface IProps {
	subtasks: { title: string }[]
	setSubtasks: (subtasks: { title: string }[]) => void
}

export const CreateSubTask = ({ subtasks, setSubtasks }: IProps) => {
	const handleAddSubtask = () => {
		const currentSubtasks = [...subtasks]
		currentSubtasks.push({ title: '' })
		setSubtasks(currentSubtasks)
	}

	const handleDeleteSubtask = (index: number) => {
		setSubtasks(subtasks.filter(subtask => subtasks.indexOf(subtask) !== index))
	}

	return (
		<div className='text-center'>
			<div>
				{subtasks.map((subtask, index) => (
					<div key={index} className='flex items-center justify-around'>
						<div>
							<input
								className='rounded-md font-medium outline-none px-4 py-2 bg-transparent border-[1px] border-[#707088] my-2 transition-all duration-200 focus:bg-slate-100 focus:text-[#707088] w-full'
								type='text'
								placeholder='Enter title for subtask'
								onChange={e => (subtask.title = e.target.value)}
							/>
						</div>
						<div>
							<button onClick={() => handleDeleteSubtask(index)}>
								<Image src='/cross.svg' alt='icon' width={11} height={11} />
							</button>
						</div>
					</div>
				))}
			</div>
			<div>
				<Button
					onClick={() => handleAddSubtask()}
					className='hover:text-[#5A54D6] hover:bg-white border-white py-[6px] mt-2'
				>
					+ Add Subtask
				</Button>
			</div>
		</div>
	)
}
