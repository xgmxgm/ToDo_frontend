'use client'

import { useEffect, useState } from 'react'
import { Colors } from '../data'

interface IProps {
	state: string,
	setState: (state: string) => void,
}

export const SelectColor = ({ state, setState }: IProps) => {
	const [current, setCurrent] = useState<number>();

	useEffect(() => {
		console.log(current)
	})

	return (
		<>
			<div
				className='flex justify-evenly items-center w-full'
			>
				{
					Colors.map((color, index) =>
					<div
						onClick={() => setCurrent(index)}
						className={`w-5 h-5 rounded-full bg-[${color.colorHEX}] cursor-pointer `}
						// className={`w-5 h-5 rounded-full bg-[#DEB3E0] cursor-pointer`}
						key={index}
					>
						{/* <p>{color.colorHEX}</p>
						<p>{index}</p> */}
					</div>)
				}
			</div>
		</>
	)
}