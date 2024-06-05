'use client'

import { useState } from 'react'
import { Colors } from '../data'

interface IProps {
	state: string,
	setState: (state: string) => void,
}

export const SelectColor = ({ state, setState }: IProps) => {
	const [current, setCurrent] = useState<boolean>(false);

	return (
		<>
			<div
				className='flex justify-evenly items-center w-full'
			>
				{
					Colors.map((color, index) =>
					<div
						onClick={() => setCurrent(!current)}
						className={`w-5 h-5 rounded-full bg-[${color.colorHEX}] cursor-pointer ${current && 'border-8 border-white p-5'}`}
						// className={`w-5 h-5 rounded-full bg-[#DEB3E0]`}
						key={index}
					>
					</div>)
				}
			</div>
		</>
	)
}