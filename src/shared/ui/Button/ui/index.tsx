import React from 'react'

interface IProps {
	children: React.ReactNode
	onClick?: () => void
}

export const Button = ({ children, onClick }: IProps) => {
	return (
		<button
			className='text-center border-[2px] border-[#5A54D6] w-full rounded-full py-2 my-4 transition-all duration-200 hover:bg-[#5A54D6] font-semibold'
			onClick={onClick}
			type='submit'
		>
			{children}
		</button>
	)
}
