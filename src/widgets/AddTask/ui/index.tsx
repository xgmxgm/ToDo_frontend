'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Modal } from '@/widgets/Modal'
import axios from '@/axios'

interface IProps {
	active: boolean,
	setActive: (active: boolean) => void,
}

export const AddTask = ({ active, setActive }: IProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	// const [active , setActive] = useState<boolean>(false);

	const addTask = async () => {
		if (inputValue !== '' && inputValue.length >= 5) {
			await axios.post("/create", {description: inputValue})
		}

		setInputValue('')
	};

	// return (
	// 	<div className='flex justify-center items-center gap-[10px]'>
	// 		<input
	// 			className='border-4 border-gray-500 border-solid rounded-xl py-2 px-4 text-3xl'
	// 			type="text"
	// 			placeholder='Enter description...'
	// 			onChange={(e) => setInputValue(e.target.value)}
	// 			value={inputValue}
	// 			onKeyDown={(e) => {e.key == "Enter" && addTask()}}
	// 		/>
	// 		<button
	// 			className='p-2 border-4 border-gray-500 rounded-xl text-3xl'
	// 			onClick={addTask}
	// 		>Enter</button>
	// 	</div>
	// )

	return (
		<div>
			<button
				className='rounded-3xl py-2 px-16 text-xl bg-gradient-to-tr from-red-500 to-pink-500 text-white transition-all duration-300 hover:shadow-md hover:shadow-red-500 hover:rounded-lg'
				onClick={() => setActive(!active)}>
				<div className='flex items-center gap-4'>
					<p>Add tasks</p>
					<Image src='/plus.svg' alt='cross' width={15} height={15} />
				</div>
			</button>
			<Modal active={active} setActive={setActive}>
				{/* <h2 className='text-white'>modal window</h2> */}
				<span></span>
			</Modal>
		</div>
	)
}