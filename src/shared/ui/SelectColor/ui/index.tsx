'use client'

import { useState } from 'react'
import { Colors } from '../data'

interface IProps {
	setState: (state: string) => void,
}

export const SelectColor = ({ setState }: IProps) => {
	const [current, setCurrent] = useState<number>();

	const handleCurrent = (index: number, color: string) => {
		setCurrent(index)
		setState(color)
	}

	return (
		<>
			<div
				className='flex justify-evenly items-center w-full'
			>
				{
					Colors.map((color, index) =>
					<div
						onClick={() => handleCurrent(index, color)}
						className="w-7 h-7 rounded-full p-1 flex justify-center items-center cursor-pointer"
						style={{border: current == index ? "2px solid #5A54D6" : "2px solid #fff", transition: "100ms"}}
						key={index}
					>
						<div
							className='w-full h-full rounded-full'
							style={{backgroundColor: color}}
						></div>
					</div>)
				}
			</div>
		</>
	)
}