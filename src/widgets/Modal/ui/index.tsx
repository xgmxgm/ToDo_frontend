import React, { useState } from 'react'

import axios from '@/axios'

interface IProps {
	active: boolean,
	setActive: (active: boolean) => void,
	children: React.ReactNode,
}

// export const Modal = ({ active, setActive, childred }: IProps) => {
export const Modal = (props: IProps) => {
	const { active, children, setActive } = props;
	const [inputValue, setInputValue] = useState<string>('');

	const addTask = async () => {
		if (inputValue !== '' && inputValue.length >= 5) {
			await axios.post("/create", {description: inputValue})
		}

		setInputValue('')
		setActive(false)
	};

	return (
		<>
			{
				active ? 
					<div 
						className='w-screen h-screen bg-black/80 fixed top-0 left-0 z-10 flex justify-center items-center'
						onClick={() => setActive(false)} >
						{children}
						<div
							className='bg-gray-300 flex flex-col items-center justify-center max-w-96 px-20 py-32 rounded-lg'
							onClick={(e) => e.stopPropagation()}>
							<input
								type="text"
								placeholder='Enter description...'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={(e) => {e.key == "Enter" && addTask()}}
								className='outline-none rounded-lg mb-10 p-2' />
							<button
								className='text-black bg-green-600 shadow-xl shadow-black/20 px-4 py-2 rounded-md hover:bg-green-700 hover:text-white transition-all duration300'
								onClick={() => addTask()}>Create</button>
						</div>
					</div> :
					<div>

					</div>
			}
		</>
	)
}