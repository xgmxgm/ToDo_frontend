'use client'

import axios from '@/axios'
import { useState } from 'react'

export const AddTask = () => {
	const [inputValue, setInputValue] = useState<string>('');

	const addTask = async () => {
		if (inputValue !== '' && inputValue.length >= 5) {
			await axios.post("/create", {description: inputValue})
		}

		setInputValue('')
	}

	return (
		<div className='flex justify-center items-center gap-[5px]'>
			<input
				className='border-2 border-gray-500 border-solid rounded-lg py-1 px-2' type="text"
				placeholder='Enter description...'
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyDown={(e) => {e.key == "Enter" && addTask()}}
			/>
			<button
				className='p-1 border-2 border-gray-500 rounded-lg'
				onClick={addTask}
			>Enter</button>
		</div>
	)
}