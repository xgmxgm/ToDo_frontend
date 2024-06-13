import React from 'react'

interface IProps {
	children: React.ReactNode,
	setState: (state: boolean) => void,
}

export const Modal = ({ children, setState }: IProps) => {
	return (
		<>
			<div
				className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.7)] cursor-pointer'
				onClick={() => setState(false)}
			>
				<div
					className='bg-[#21222B] p-4 rounded-lg cursor-default'
					onClick={(e) => e.stopPropagation()}
				>
					{children}
				</div>
			</div>
		</>
	)
}