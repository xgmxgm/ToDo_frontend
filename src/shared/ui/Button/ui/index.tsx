import React from 'react'

interface IProps {
	children: React.ReactNode
	onClick?: () => void
	className?: string
}

export const Button = ({ children, onClick, className = '' }: IProps) => {
	return (
		<button
			className={
				'text-center border-[2px] border-[#5A54D6] w-full rounded-full roun py-2 transition-all duration-200 hover:bg-[#5A54D6] font-semibold' +
				' ' +
				className
			}
			onClick={onClick}
			type='submit'
		>
			{children}
		</button>
	)
}
