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
		<div className='flex justify-center items-center gap-[10px]'>
			<input
				className='border-4 border-gray-500 border-solid rounded-xl py-2 px-4 text-3xl'
				type="text"
				placeholder='Enter description...'
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyDown={(e) => {e.key == "Enter" && addTask()}}
			/>
			<button
				className='p-2 border-4 border-gray-500 rounded-xl text-3xl'
				onClick={addTask}
			>Enter</button>
		</div>
	)
}