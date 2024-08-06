import React from 'react'

interface IProps {
	children: React.ReactNode
	state: boolean
	setState: (state: boolean) => void
}

export const Modal = ({ children, setState, state }: IProps) => {
	return (
		<div
			className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.4)] cursor-pointer transition-all z-30'
			style={
				state
					? { opacity: '1', pointerEvents: 'all' }
					: { opacity: '0', pointerEvents: 'none' }
			}
			onClick={() => setState(false)}
		>
			<div
				className='bg-[#21222B] p-4 rounded-lg cursor-default transition-all'
				style={
					state
						? { scale: '1', pointerEvents: 'all' }
						: { scale: '0', pointerEvents: 'none' }
				}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}
